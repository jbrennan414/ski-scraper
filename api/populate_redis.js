var redis = require('redis'), client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);
const userData = require('../worker/user_data');

// this is a function to seed the redis
// cache with data 
async function populateRedis() {
    const success = await setAsync('userDesiredSkiDates', JSON.stringify(userData));
    console.log({success})
}

module.exports = populateRedis;

