//this file doesn't really do anything because I don't know how to run it :)
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const addDate = require('./addDate');
const removeDate = require('./removeDate');

const token = process.env.TELEGRAM_TEST_TOKEN;
//const token = process.env.TELEGRAM_TOKEN;
let bot;

// if (process.env.NODE_ENV === 'production') {
//    bot = new TelegramBot(token);
//    bot.setWebHook(process.env.HEROKU_URL + bot.token);
// } else {
   bot = new TelegramBot(token, { polling: true });
// }

bot.sendMessage(process.env.TELEGRAM_TEST_CHAT_ID, "Hi Mark Ski Scraper Bot has started!")

//bot.sendMessage(process.env.MARK_TELEGRAM_CHAT_ID, "Hi Mark Ski Scraper Bot has started!")
//bot.sendMessage(process.env.JOHN_TELEGRAM_CHAT_ID, "Hi John Ski Scraper Bot has started!")

bot.on('message', (msg) => {

    var hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(msg.chat.id,"Thanks for using Ski Scraper!  Here is your chat ID" + msg.chat.id);
    }
    
    var add = 'add' //add 2021-03-13/winterpark 
    if (msg.text.toString().toLowerCase().includes(add) ){
        var resort = msg.text.split('/')[1]
        var almostDate = msg.text.split('/')[0]
        var date = almostDate.split(' ')[1]
        var chatID = msg.chat.id;
        addDate(date, resort, chatID)
    
        bot.sendMessage(msg.chat.id,"Cool. You will be notified when " + date + " at "+ resort + " becomes available")
    }

    var remove = 'remove' //remove 2021-03-13/winterpark 
    if (msg.text.toString().toLowerCase().includes(remove) ){
        console.log("hhhhhh")
        var resort = msg.text.split('/')[1]
        var almostDate = msg.text.split('/')[0]
        var date = almostDate.split(' ')[1]
        var chatID = msg.chat.id;
        removeDate(date, resort, chatID)
    
        bot.sendMessage(msg.chat.id,"Cool.  You will not be notified of " + date + " at "+ resort)
    }
        
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "See you on the slopes, Bye");
    } 
    
    });

    bot.onText(/\/start/, (msg) => {

        bot.sendMessage(msg.chat.id, "Welcome");
            
        });
      