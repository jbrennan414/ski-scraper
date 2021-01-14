var redis = require('redis'), client = redis.createClient();
const {promisify} = require('util');
const setAsync = promisify(client.SADD).bind(client);
const getAsync = promisify(client.SMEMBERS).bind(client);

async function seedData(resort, telegram_id) {
    // const key = telegram_id + ":" + resort
    // const type = telegram_id + ":pass_type"
    // let dateArray1 = ["2021-02-06","2021-02-13","2021-02-07","2021-02-14","2021-02-20","2021-02-21"]

    // //we can add them one by one, with the key and then date
    // dateArray1.map(date => await setAsync(key, date))
    // await setAsync(type, "base")
    
    // //let dateArry2 = ["2021-03-13","2021-03-14","2021-03-20","2021-03-21","2021-03-27","2021-03-28"]
    // const key = telegram_id + ":" + resort
    // await setAsync(key,date);

    // let datesForKey = await getAsync(key)
    // return datesForKey

}

module.exports = seedData;