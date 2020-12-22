var fetch = require('node-fetch');
var redis = require('redis'), client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://api.parkwhiz.com/v4/venues/448854/events/?fields=%3Adefault%2Csite_url%2Cavailability%2Cvenue%3Atimezone&q=%20starting_after%3A2020-12-18T00%3A00%3A00-07%3A00&sort=start_time&zoom=pw%3Avenue'

async function fetchCopper(){

    const allJobs = [];

    // fetch all pages
    const res = await fetch(`${baseURL}`);
    const jobs = await res.json();
    allJobs.push(...jobs);

    console.log(allJobs)

    // set in redis
    // const success = await setAsync('github', JSON.stringify(allJobs));
    // console.log({success})
}

fetchCopper();

module.exports = fetchCopper;

// 38: { //A-Basin
    // unavailable_dates: {
        // 2021-05-31,
        // 2021-05-31,
    // },
    // closed_dates: {
        // 2021-05-31,
        // 2021-05-31,
        // 2021-05-31,
    // }
// }