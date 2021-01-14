const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
var fetch = require('node-fetch');
const fetchResortData = require('./fetch-resort-data');
const { isSupportedResort, getUserDesiredSkiDates, delay, isPast } = require('../utils');
var redis = require('redis'), client = redis.createClient();

async function populateRedis() {

    let redisKeys;

    client.keys('*', function (err, keys) {
        redisKeys = keys;
    })
      
    await delay()
    return redisKeys

}

async function checkDates(){

    const redisKeys = await populateRedis()
    let resortsToFetch = [];
    let userIDList = [];

    console.log("checking dates...", Date())

    // let's get a list of userIDs and resorts they want to ski
    redisKeys.forEach(key => {
        const userID = key.split(":")[0];
        const value = key.split(":")[1];

        // add userID
        if (userID && !userIDList.includes(userID)){
            userIDList.push(userID)
        }

        if (value && isSupportedResort(value) && !resortsToFetch.includes(value)){
            resortsToFetch.push(value)
        }
    })

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
    console.log(unavailableSkiDays)

    // Run through all users, check if they're ski days are blacked out...or available
    userIDList.map(async userID => {
        const userData = await getUserDesiredSkiDates(userID)
        let hasBasePass = false;

        let usersResorts = Object.keys(userData)

        // Check if this pass is basic
        if (userData["passtype"] && userData["passtype"] == "base"){
            hasBasePass = true;
        }


        usersResorts.forEach(resort => {

            if (resort == "passtype"){
                return;
            }
            
            let availableSkiDays = [];

            console.log(`FOR ${resort}`)

            // Look at desired ski dates
            const desiredSkiDates = userData[resort];

            desiredSkiDates.forEach(desiredDate => {
                
                // check for past dates
                if (isPast(desiredDate)){
                    return;
                }

                // check for blackout dates
                if (hasBasePass && unavailableSkiDays[resort]["blackoutDates"].includes(desiredDate)){
                    return
                }

                // check for availability
                if (!unavailableSkiDays[resort]["unavailableDates"].includes(desiredDate)){
                    availableSkiDays.push(desiredDate)
                }
            })

            if (availableSkiDays.length > 0){
                const message = `Hey! Your requested dates of ${availableSkiDays} are available at ${resort}`
                console.log(message)
                console.log(userID)
                bot.sendMessage(userID, message)
            }

        })
        
    })

}

module.exports = checkDates;