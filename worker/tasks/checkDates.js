const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const userData = require('../user_data');
const fetchResortData = require('./fetch-resort-data');

async function checkDates(){

    console.log("checking dates...", Date())

    const allUsers = Object.keys(userData["userData"])
    let resortsToFetch = [];

    // Loop over all users and get the resorts they want to ski
    allUsers.forEach(user => {
        const userDesiredResorts = Object.keys(userData["userData"][user]["desiredSkiDays"]);

        // Gross 
        userDesiredResorts.forEach(resort => {
            if (resort && !resortsToFetch.includes(resort)){
                resortsToFetch.push(resort);
            }
        })
    });


    // This will fetch our dates for us...apparently
    // forEach is not promise-aware...it's kinda slow, 
    // but we should only do it once, which is nice
    const getResortDates = async _ => {
        let requestedUnavailableDays = {};

        const promises = resortsToFetch.map(async resort => {
          const skiData = await fetchResortData(resort)
          requestedUnavailableDays[resort] = skiData
          return skiData
        })
      
        await Promise.all(promises)
        return requestedUnavailableDays;

    }

    let unavailableSkiDays = await getResortDates()

    // Run through all users, check if they're ski days are blacked out...or available
    allUsers.forEach(user => {
        let desiredSkiDays = userData["userData"][user]["desiredSkiDays"]

        let hasBasePass = userData["userData"][user]["passType"] == "base"

        //Loop over desired ski days, check against unavailable ski days
        for (var resort in desiredSkiDays){
            if (desiredSkiDays.hasOwnProperty(resort)){

                const allDesiredSkiDaysByResort = desiredSkiDays[resort]
                let desiredDaysByResortUnnotified = []
                
                //TODO, I'm sure there's a better way to do this...
                Object.keys(allDesiredSkiDaysByResort).forEach(desiredDate => {
                    if (allDesiredSkiDaysByResort[desiredDate]["hasBeenNotified"] == false){
                        desiredDaysByResortUnnotified.push(desiredDate)
                    }
                })

                let availableSkiDays = []

                desiredDaysByResortUnnotified.forEach(day => {
                    if (hasBasePass){ //check blackout dates
                        const resortBlackoutDates = unavailableSkiDays[resort]["blackoutDates"];
                        if (resortBlackoutDates.includes(day)){
                            console.log(`Uh oh ${user}...${day} is blacked out for you at ${resort}`)
                            return
                        }
                    }

                    const resortUnavailableDays = unavailableSkiDays[resort]["unavailableDates"]

                    if (!resortUnavailableDays.includes(day)){
                        availableSkiDays.push(day)
                    }

                })

                const message = `Horray! Your requested dates of ${availableSkiDays} are available at ${resort}`

                // TODO add string interpolation below to be the user's name, all caps
                bot.sendMessage(process.env.JOHN_TELEGRAM_CHAT_ID, message)


            }
        }

    })




    // If one of our dates is not on the list, send John or Mark an email

    //here is how we send the message 
    // bot.sendMessage(process.env.MARK_TELEGRAM_CHAT_ID, `Sick!  Your requested date of  is available`)
    // bot.sendMessage(process.env.JOHN_TELEGRAM_CHAT_ID, `Sick!  Your requested date of  is available`)

}

/* TODO: 
    - Check for historic dates...only query ${today} forward
    - Add a reasonable "lead" window...I don't want to be notified day-of, 20 minutes before lifts start
    - Need to add redis to toggle ["hasBeenNotified"]
    - Double check the resort data...what's the deal with that [0]?
*/

checkDates();

module.exports = checkDates;