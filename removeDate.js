var redis = require('redis'), client = redis.createClient();
const {promisify} = require('util');
const deleteAsync = promisify(client.SREM).bind(client);
const getAsync = promisify(client.SMEMBERS).bind(client);

async function removeDate(date, resort, telegram_id) {

    const key = telegram_id + ":" + resort

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


    await deleteAsync(key,date);
    let datesForKey = await getAsync(key)
    return datesForKey

}

module.exports = { removeDate: removeDate };