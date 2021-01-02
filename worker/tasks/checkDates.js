const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_TOKEN;
// const bot = new TelegramBot(token, { polling: true });
const userData = require('../user_data');
const fetchResortData = require('./fetch-resort-data');

function checkDates(){

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

    // Determine which resorts we need to fetch...and fetch them _once_
    resortsToFetch.forEach(resort => {
        fetchResortData(resort)
    });

    // If one of our dates is not on the list, send John or Mark an email

    //here is how we send the message 
    // bot.sendMessage(process.env.MARK_TELEGRAM_CHAT_ID, `Sick!  Your requested date of  is available`)
    // bot.sendMessage(process.env.JOHN_TELEGRAM_CHAT_ID, `Sick!  Your requested date of  is available`)

}

checkDates();

module.exports = checkDates;