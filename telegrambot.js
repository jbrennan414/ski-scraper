const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const { addDate } = require('./addDate');
const { removeDate } = require('./removeDate');
const seedData = require('./seedData');
const seedType = require('./seedType');

// const token = process.env.TELEGRAM_TEST_TOKEN;
const token = process.env.TELEGRAM_TOKEN;
let bot;

// if (process.env.NODE_ENV === 'production') {
//    bot = new TelegramBot(token);
//    bot.setWebHook(process.env.HEROKU_URL + bot.token);
// } else {
   bot = new TelegramBot(token, { polling: true });
// }

//bot.sendMessage(process.env.TELEGRAM_TEST_CHAT_ID, "Hi Mark Ski Scraper Bot has started!")

bot.sendMessage(process.env.MARK_TELEGRAM_CHAT_ID, "Hi Mark Ski Scraper Bot has started!")
bot.sendMessage(process.env.JOHN_TELEGRAM_CHAT_ID, "Hi John Ski Scraper Bot has started!")

bot.on('message', async (msg) => {

    var hi = "hi";
    var add = 'add' //add 2021-03-13/winterpark 
    var remove = 'remove' //remove 2021-03-13/winterpark 

    //They said hi
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
        return bot.sendMessage(msg.chat.id,"Thanks for using Ski Scraper!  Here is your chat ID" + msg.chat.id);

    // user wants to add 
    } else if (msg.text.toString().toLowerCase().includes(add)){

        if (!isValidMessage(msg.text)){
            return bot.sendMessage(msg.chat.id, "Oops, wrong format, please use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark`");
        }

        var resort = msg.text.split('/')[1]
        var almostDate = msg.text.split('/')[0]
        var date = almostDate.split(' ')[1]
        var chatID = msg.chat.id;
        var newDates = await addDate(date, resort, chatID)
        
        return bot.sendMessage(msg.chat.id, "Date Added! Here are your current requested dates at " + resort + ":" + newDates )

    // user wants to remove
    } else if (msg.text.toString().toLowerCase().includes(remove)){

        if (!isValidMessage(msg.text)){
            return bot.sendMessage(msg.chat.id, "Oops, wrong format, please use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark`");
        }

        var resort = msg.text.split('/')[1]
        var almostDate = msg.text.split('/')[0]
        var date = almostDate.split(' ')[1]
        var chatID = msg.chat.id;
        var newDates = await removeDate(date, resort, chatID)
    
        return bot.sendMessage(msg.chat.id, "Date Removed! Here are your current requested dates at " + resort + ":" + newDates )
    } else {
        return bot.sendMessage(msg.chat.id, "Oops, wrong format, please use the following format: `add 2021-03-13/winterpark` OR `remove 2021-03-13/winterpark`");

    }
    
});
    
    //this will seed test data.  Uncomment this for local development
    // var seed = 'seed' //seed winterpark
    // if (msg.text.toString().toLowerCase().includes(seed) ){
    //     var resort = almostDate.split(' ')[1]
    //     console.log("resort", resort)

    //     var newDates = await seedData(resort, chatID)
    
    //     bot.sendMessage(msg.chat.id, "Date Seeded! Here is the current data :" + newDates )
    // }

    //this will seed test data.  Uncomment this for local development
    // var seed = 'seed' //seed 
    // if (msg.text.toString().toLowerCase().includes(seed) ){
    //     var resort = almostDate.split(' ')[1]
    //     console.log("resort", resort)

    //     var newDates = await seedType(chatID)
    
    //     bot.sendMessage(msg.chat.id, "Dates Seeded.")
    // }
        


    bot.onText(/\/start/, (msg) => {

        bot.sendMessage(msg.chat.id, "Welcome");
            
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