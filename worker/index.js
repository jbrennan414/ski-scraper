require('dotenv').config()
var CronJob = require('cron').CronJob;

const checkDates = require('./tasks/fetch-resort-data');

new CronJob('*/10 * * * *', checkDates, null, true, "America/Los_Angeles");