var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-ikon');

new CronJob('* * * * *', fetchGithub, null, true, "America/Los_Angeles");