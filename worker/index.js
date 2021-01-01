var CronJob = require('cron').CronJob;

const checkDates = require('./tasks/checkDates');

new CronJob('*/10 * * * *', checkDates, null, true, "America/Los_Angeles");