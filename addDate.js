var redis = require('redis'), client = redis.createClient();
const {promisify} = require('util');
const setAsync = promisify(client.SADD).bind(client);
const getAsync = promisify(client.SMEMBERS).bind(client);

async function addDate(date, resort, telegram_id) {

    const key = telegram_id + ":" + resort
    await setAsync(key,date);

    let datesForKey = await getAsync(key)
    return datesForKey

}

module.exports = addDate;