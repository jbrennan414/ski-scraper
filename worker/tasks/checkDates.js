const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
var fetch = require('node-fetch');
const fetchResortData = require('./fetch-resort-data');
const populateRedis = require('../../api/populate_redis');

const USER_DATES = "http://localhost:3001/api/userDesiredSkiDates"; // ok this works for local development

async function fetchRedis(){
    const res = await fetch(USER_DATES)
    let json = await res.json();

    return json;
}

async function checkDates(){


    // populateRedis()

    const userData = await fetchRedis()
    console.log("this is our userData...from redis", userData)

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

                    // add a check for dates in the past
                    if (isPast(desiredDate)){
                        return
                    }

                    if (allDesiredSkiDaysByResort[desiredDate]["hasBeenNotified"] == false){
                        desiredDaysByResortUnnotified.push(desiredDate)
                    }
                })

                let availableSkiDays = []

                desiredDaysByResortUnnotified.forEach(day => {
                    if (hasBasePass){ //check blackout dates
                        const resortBlackoutDates = unavailableSkiDays[resort]["blackoutDates"];
                        if (resortBlackoutDates.includes(day)){
                            return
                        }
                    }

                    const resortUnavailableDays = unavailableSkiDays[resort]["unavailableDates"]

                    if (!resortUnavailableDays.includes(day)){
                        availableSkiDays.push(day)
                    }

                })

                if (availableSkiDays.length > 0){
                    const message = `Hey ${user}! Your requested dates of ${availableSkiDays} are available at ${resort}`
                    console.log(message)
                    bot.sendMessage(userData["userData"][user]["telegram_id"], message)
                }
            }
        }

    })
}

function isPast(desiredDate){

    var desiredDate = new Date(desiredDate);
    var todaysDate = new Date()

    if (desiredDate > todaysDate){
        return false 
    } else {
        return true
    }
}



checkDates();

module.exports = checkDates;