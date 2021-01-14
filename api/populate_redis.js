var redis = require('redis'), client = redis.createClient();

const {promisify, callbackify} = require('util');
const setAsync = promisify(client.set).bind(client);
const userData = require('../worker/user_data');

// this is a function to seed the redis
// cache with data 
 async function populateRedis() {

    // This is isn't declared as `async` because it already returns a promise
    function delay() {
        // `delay` returns a promise
        return new Promise(function(resolve, reject) {
          // Only `delay` is able to resolve or reject the promise
          setTimeout(function() {
            resolve(42); // After 3 seconds, resolve the promise with value 42
          }, 3000);
        });
    }

    let redisKeys;

    client.keys('*', function (err, keys) {
        redisKeys = keys;
    })
      
    await delay()
    return redisKeys

}

module.exports = populateRedis;

