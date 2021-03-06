require('dotenv').config()
var CronJob = require('cron').CronJob;

const checkDates = require('./tasks/checkDates');

// Every hour from 6 am - 10 pm
new CronJob('*/15 6-21/1 * * *', checkDates, null, true, "America/Denver");
// new CronJob('* * * * *', checkDates, null, true, "America/Denver");

