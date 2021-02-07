var redis = require('redis'), client = redis.createClient();
const {promisify} = require('util');
const setAsync = promisify(client.SADD).bind(client);
const getAsync = promisify(client.SMEMBERS).bind(client);

async function addDate(date, resort, telegram_id) {

    if (!resort || !date){
        return;
    }

    let splitDate = date.split("-")
    let year = splitDate[0];
    let month = splitDate[1];
    let day = splitDate[2];

    if (month.length == 1){
        month = `0${month}`;
    }

    if (day.length == 1){
        day = `0${day}`;
    }

    date = `${year}-${month}-${day}`    

    const key = telegram_id + ":" + resort
    await setAsync(key,date);

    let datesForKey = await getAsync(key)
    return datesForKey

}

module.exports = { addDate: addDate};