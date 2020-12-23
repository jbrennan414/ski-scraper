var fetch = require('node-fetch');

var fetchWinterPark = require("./fetch-winterpark")

function checkDates(){
    console.log("does this break if we change it?")

    let johnAvailableDays = {}
    let markAvailableDays = {}

    // Get John and Mark's Ski Days
    const johnSkiDays = {
        "winterpark": ["2020-12-29", "2021-01-03", "2021-01-19"],
        "copper":["2021-02-19", "2021-03-25", "2021-04-02"]
    }

    const markSkiDays = {
        "winterpark": ["2021-03-24", "2021-02-12", "2021-03-02"],
        "steamboat": ["2020-12-25", "2021-04-20", "2021-04-04"]
    }

    // Fetch unavailable / closed days from the resorts specified above ^^
    let resortsToFetch = Object.keys(johnSkiDays).concat(Object.keys(markSkiDays))
    resortsToFetch = [...new Set(resortsToFetch)];

    resortsToFetch.forEach(resort => {

        switch (resort) {
            case "winterpark":

                break;

            case "copper":

                break;

            case "steamboat":
        
            default:
                break;
        }



    })

    // If one of our dates is not on the list, send John or Mark an email




}

checkDates();

module.exports = checkDates;