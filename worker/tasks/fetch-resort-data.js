require('dotenv').config();
const puppeteer = require('puppeteer');


async function fetchResortData(resort) {

  let resortID;

  switch (resort) {
    case "winterpark":
      
      resortID = 34;
      break;

    case "abasin":

      resortID = 38;
      break;

    case "taos":

      resortID = 31;
      break;
  
    case "bigsky":
      
      resortID = 4;
      break;

    case "brighton":

      resortID = 8;
      break;

    default:
      break;
  }
  

  const IKON_URL = "https://account.ikonpass.com/en/login?redirect_uri=/en/myaccount"

  const RESORT_DATA_URL = `https://account.ikonpass.com/api/v2/reservation-availability/${resortID}`

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser', // this needs to be commented out for local development
    args: ['--no-sandbox'] // this needs to be commented out for local development
  });

  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 720});
  await page.goto(IKON_URL, { waitUntil: 'networkidle0' }); // wait until page load
  await page.type('#email', process.env.EMAIL);
  await page.type('#sign-in-password', process.env.PASS);

  // click and wait for navigation
  await Promise.all([
      page.click("button[type='submit']"),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);


  // To get the resort's ski availability
  console.log(`fetching ${resort}...`)  
  const response = await page.goto(RESORT_DATA_URL, { waitUntil: 'networkidle0'});

  const rawResponse = await response.json()
  
  const blackoutDates = rawResponse["data"][0]["blackout_dates"];
  let unavailableDates = rawResponse["data"][0]["unavailable_dates"]
  unavailableDates = unavailableDates.concat(rawResponse["data"][0]["closed_dates"])
  unavailableDates = [...new Set(unavailableDates)];

  let allProhibitedDates = {
    blackoutDates,
    unavailableDates
  }

  browser.close()

  return allProhibitedDates;

}

module.exports = fetchResortData;

