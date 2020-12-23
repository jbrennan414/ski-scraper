var fetch = require('node-fetch');

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://ikon-data.herokuapp.com/data'

async function fetchWinterPark(){

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


    return winterParkData;

}

fetchWinterPark();

module.exports = fetchWinterPark;