var redis = require('redis'), client = redis.createClient();
const {promisify} = require('util');
const deleteAsync = promisify(client.SREM).bind(client);
const getAsync = promisify(client.SMEMBERS).bind(client);

async function removeDate(date, resort, telegram_id) {

    const key = telegram_id + ":" + resort
    await deleteAsync(key,date);
    let datesForKey = await getAsync(key)
    return datesForKey

}

module.exports = removeDate;