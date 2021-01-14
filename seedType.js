var redis = require('redis'), client = redis.createClient();
const {promisify} = require('util');
const setAsync = promisify(client.SADD).bind(client);
//const getAsync = promisify(client.SMEMBERS).bind(client);
//const getAll = promisify(client.HHHHHHH).bind(client);

async function seedType(telegram_id) {
    const type = telegram_id + ":pass_type"
    await setAsync(type, "base")
    await setAsync(telegram_id +":winterpark", "2021-03-10","2021-03-01","2021-03-06")
    await setAsync("782458934:pass_type","full")
    await setAsync("782458934:taos", "2021-03-06","2021-03-07")
    await setAsync("782458934:winterpark", "2021-03-10","2021-03-01")
}

module.exports = seedType;

//all you gotta do is fire it up.  then flush it, and then do seed and then add 
//anothe date to winter park and see if you 
//get 3 dates