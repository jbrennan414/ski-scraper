const { Telegraf } = require('telegraf')
const { isSupportedResort } = require('./worker/utils');
const { addDate } = require('./addDate');
const { removeDate } = require('./removeDate');
const seedData = require('./seedData');
require('dotenv').config();

// const bot = new Telegraf(process.env.TELEGRAM_TEST_TOKEN)
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

const welcomeMessage = "Hi! Please text me to add or remove your ski dates. We check Ikon every 15 minutes from 6 AM-10 PM. \n\nPlease use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark` \n\nSee you on the slopes! ";
const supportedResorts = "taos, winterpark, abasin, bigsky, brighton";
const wrongResortMessage = `Oops, we don't recognize that resort, we only support: ${supportedResorts} right now`;
const generalErrorMessage = "Oops, wrong format, please use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark`";

bot.on('message', async context => {
    const { reply, update } = context;
    const { message } = update;
    const { text } = message;

    const parsedMessage = text.toString().toLowerCase()

    const userID = context.message.from.id;
    const hiMessage = `Thanks for using Ski Scraper!  Here is your chat ID: ${userID}`;

    // they started
    if (parsedMessage === "/start"){
        context.reply(welcomeMessage)
    // they said hi
    } else if (parsedMessage === 'hi'){
        context.reply(hiMessage);
    // they said add
    } else if (text.includes('add') || text.includes("Add")) {

        if (!isValidMessage(parsedMessage)){
            return context.reply(generalErrorMessage);
        }

        var resort = parsedMessage.split('/')[1].replace(/\s/g, '');

        if (!isSupportedResort(resort)){
            return context.reply(wrongResortMessage);
        }
        
        var almostDate = parsedMessage.split('/')[0];
        var date = almostDate.split(' ')[1];
        var newDates = await addDate(date, resort, userID);

        return context.reply(`Date Added! Here are your current requested dates at ${resort}: ${newDates}`)
    // they said remove
    } else if (text.includes('remove') || text.includes("Remove")){

        if (!isValidMessage(parsedMessage)){
            return context.reply(generalErrorMessage);
        }

        var resort = parsedMessage.split('/')[1].replace(/\s/g, '')
        
        if (!isSupportedResort(resort)){
            return context.reply(wrongResortMessage);
        }

        var almostDate = parsedMessage.split('/')[0];
        var date = almostDate.split(' ')[1];
        var newDates = await removeDate(date, resort, userID);

        return context.reply(`Date Removed! Here are your current requested dates at ${resort}: ${newDates}`)

    } else if (text === "seed"){
        await seedData();
        return context.reply("Dates seeded");
    } else {
        return context.reply(generalErrorMessage);
    }

})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

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
    bot.telegram.sendMessage(userID, message);
}

module.exports = { sendMessage: sendMessage}