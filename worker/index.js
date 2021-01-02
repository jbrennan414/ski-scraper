require('dotenv').config()
var CronJob = require('cron').CronJob;

const checkDates = require('./tasks/checkDates');

new CronJob('* * * * *', checkDates, null, true, "America/Los_Angeles");