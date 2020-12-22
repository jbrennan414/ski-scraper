var fetch = require('node-fetch');
var redis = require('redis'), client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://ikon-data.herokuapp.com/data'

async function fetchGithub(){

    const allData = [];

    // fetch all pages
    const res = await fetch(`${baseURL}`);
    const jobs = await res.json();
    allData.push(...jobs);

    const closed_dates = allData[0]["closed_dates"];
    const unavailable_dates = allData[0]["unavailable_dates"];

    const bad_dates = closed_dates.concat(unavailable_dates)

    const winterParkData = {
        "winter_park": {
            "bad_dates": bad_dates
        }
    }

    // set in redis
    const success = await setAsync('ski-scraper', JSON.stringify(winterParkData));
    console.log({success})
}

fetchGithub();

module.exports = fetchGithub;