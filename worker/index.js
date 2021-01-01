require('dotenv').config()
var CronJob = require('cron').CronJob;

const checkDates = require('./scrapers/fetch-a-basin');

new CronJob('*/10 * * * *', checkDates, null, true, "America/Los_Angeles");