var redis = require('redis'), client = redis.createClient();


function isSupportedResort(resort){
    const supportedResorts = ["taos", "winterpark", "abasin", "bigsky", "brighton"];
    const isSupported = supportedResorts.includes(resort) 
    return isSupported;
}

const getUserDesiredSkiDates = async user => {
    let userSkiDates = {};

    client.keys(`${user}*`, function (err, keys) {
        const promises = keys.map(async key => {

            client.smembers(key, function(err, skiDates){
                const resort = key.split(":")[1];

                userSkiDates[resort] = skiDates
            })
        })
    })

    await delay()
    return userSkiDates
    
}

function delay() {
    // `delay` returns a promise
    return new Promise(function(resolve, reject) {
        // Only `delay` is able to resolve or reject the promise
        setTimeout(function() {
        resolve(42); // After 3 seconds, resolve the promise with value 42
        }, 3000);
    });
}

function isPast(desiredDate){

    var desiredDate = new Date(desiredDate);
    var todaysDate = new Date()

    if (desiredDate > todaysDate){
        return false 
    } else {
        return true
    }
}

module.exports = { isSupportedResort: isSupportedResort, 
    getUserDesiredSkiDates: getUserDesiredSkiDates,
    delay: delay,
    isPast: isPast
};