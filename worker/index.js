require('dotenv').config()
var CronJob = require('cron').CronJob;

const checkDates = require('./tasks/checkDates');

// Every two hours from 6 am - 10 pm
new CronJob('0 6-22/1 * * *', checkDates, null, true, "America/Los_Angeles");