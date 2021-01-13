var redis = require('redis'), client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);
const userData = require('../worker/user_data');

// this is a function to seed the redis
// cache with data 
 async function populateRedis() {

    const dataObject = userData["userData"];
    const userDataKeys = Object.keys(dataObject)

    userDataKeys.map(async key => {
        console.log(key)
        console.log(dataObject[key])
        const value = dataObject[key];
        const success = await setAsync(key, value);
        console.log({success})
    })

}

populateRedis()

module.exports = populateRedis;

