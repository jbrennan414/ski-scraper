var redis = require('redis'), client = redis.createClient();
const {promisify} = require('util');
const setAsync = promisify(client.SADD).bind(client);

async function seedData() {
    
    await setAsync("719487075:pass_type",'base')
    await setAsync("719487075:winterpark","2021-02-02", "2021-02-03", "2021-02-04", "2021-02-05")
    await setAsync("719487075:taos","2021-03-01","2021-03-02", "2021-03-03", "2021-03-04")
    await setAsync("719487075:abasin","2021-04-01","2021-04-02","2021-04-03")
    await setAsync("782458934:pass_type","full")
    await setAsync("782458934:winterpark","2021-01-24","2021-01-25","2021-01-26")
    await setAsync("782458934:taos","2021-02-01","2021-02-02","2021-02-03")
    await setAsync("782458934:abasin","2021-03-01","2021-03-02","2021-03-03")

}

module.exports = seedData;