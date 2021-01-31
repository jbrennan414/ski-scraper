const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { addDate } = require('./addDate');
const { removeDate } = require('./removeDate');
const seedData = require('./seedData');
const { isSupportedResort } = require('./worker/utils');

// const token = process.env.TELEGRAM_TEST_TOKEN;
const token = process.env.TELEGRAM_TOKEN;
let bot = new TelegramBot(token, { polling: true });

// bot.sendMessage(process.env.TELEGRAM_TEST_CHAT_ID, "Hi Mark Ski Scraper Bot has started!")
bot.sendMessage(process.env.JOHN_TELEGRAM_CHAT_ID, "Hi John Ski Scraper Bot has started!")

bot.on('message', async (msg) => {

    var hi = "hi";
    var add = 'add' //add 2021-03-13/winterpark 
    var remove = 'remove' //remove 2021-03-13/winterpark 
    var seed = 'seed'
    var supportedResorts = "taos, winterpark, abasin, bigsky, brighton";
    var welcomeMessage = "Hi! Please text me to add or remove your ski dates. We check Ikon every 15 minutes from 6 AM-10 PM. \n\nPlease use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark` \n\nSee you on the slopes! "

    // they started
    if (msg.text === '/start'){

        return sendMessage(msg.chat.id, welcomeMessage);

    //They said hi            
    } else if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
        return sendMessage(msg.chat.id,"Thanks for using Ski Scraper!  Here is your chat ID" + msg.chat.id);

    // user wants to add 
    } else if (msg.text.toString().toLowerCase().includes(add)){

        if (!isValidMessage(msg.text)){
            return sendMessage(msg.chat.id, "Oops, wrong format, please use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark`");
        }

        let parsedMessage = msg.text.toString().toLowerCase()

        var resort = parsedMessage.split('/')[1].replace(/\s/g, '')
        if (!isSupportedResort(resort)){
            return sendMessage(msg.chat.id, `Oops, we don't recognize that resort, we only support: ${supportedResorts} right now`);
        }

        var almostDate = parsedMessage.split('/')[0]
        var date = almostDate.split(' ')[1]
        var chatID = msg.chat.id;
        var newDates = await addDate(date, resort, chatID)
        
        return sendMessage(msg.chat.id, "Date Added! Here are your current requested dates at " + resort + ":" + newDates )

    // user wants to remove
    } else if (msg.text.toString().toLowerCase().includes(remove)){

        if (!isValidMessage(msg.text)){
            return sendMessage(msg.chat.id, "Oops, wrong format, please use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark`");
        }

        let parsedMessage = msg.text.toString().toLowerCase()

        var resort = parsedMessage.split('/')[1].replace(/\s/g, '') //remove any spaces
        if (!isSupportedResort(resort)){
            return sendMessage(msg.chat.id, `Oops, we don't recognize that resort yet, we only support: ${supportedResorts} right now`);
        }
        
        var almostDate = parsedMessage.split('/')[0]
        var date = almostDate.split(' ')[1]
        var chatID = msg.chat.id;
        var newDates = await removeDate(date, resort, chatID)
    
        return sendMessage(msg.chat.id, "Date Removed! Here are your current requested dates at " + resort + ":" + newDates )

    } else if (msg.text.toString().toLowerCase().includes(seed)){
        await seedData()
        sendMessage(msg.chat.id, "Dates Seeded. ")
    } else {
        return sendMessage(msg.chat.id, "Oops, wrong format, please use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark`");

    }
    
});

function isValidMessage(message){

    var resort = message.split('/')[1]
    var almostDate = message.split('/')[0]
    var date = almostDate.split(' ')[1]

    if (resort && almostDate && date){
        return true
    } else {
        return false
    }
}

function sendMessage(userID, message){
    bot.sendMessage(userID, message)
}

module.exports = { sendMessage: sendMessage}