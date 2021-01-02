require('dotenv').config();
const puppeteer = require('puppeteer');


async function fetchResortData(resort) {

  const IKON_URL = "https://account.ikonpass.com/en/login?redirect_uri=/en/myaccount"

  const ABASIN_URL = "https://account.ikonpass.com/api/v2/reservation-availability/38"

  const WINTERPARK_URL = "https://account.ikonpass.com/api/v2/reservation-availability/34"

  const TAOS_URL = "https://account.ikonpass.com/api/v2/reservation-availability/31"


  // To get credentials...
  const browser = await puppeteer.launch({headless: true});
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


  // To get A-Basin's Ski Availability
  console.log("fetching a-basin...")  
  const response = await page.goto(ABASIN_URL, { waitUntil: 'networkidle0'});

  const rawResponse = await response.json()
  console.log(rawResponse["data"])

  // console.log("fetching winter park...")
  // const winterParkResponse = await page.goto(WINTERPARK_URL, { waitUntil: 'networkidle0'});
  // console.log(await winterParkResponse.json())

  // console.log("fetching taos...")
  // const taosResponse = await page.goto(TAOS_URL, { waitUntil: 'networkidle0'});
  // console.log(await taosResponse.json())

  browser.close()




  return response;

}

module.exports = fetchResortData;

