var fetch = require('node-fetch');

const baseURL = 'https://ikon-data.herokuapp.com/data'


async function fetchCookie(){

  const password = ""
  const email = ""

  fetch("https://account.ikonpass.com/session", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "newrelic": "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6Ijg4MjI4NyIsImFwIjoiMzA1ODc1ODY1IiwiaWQiOiIxNjQwYWM5MWQ1NTczYjFmIiwidHIiOiIxYzQzMzJiZjIzMWI0OGE4NGViZDkwMDFhYjVlNDBjMCIsInRpIjoxNjA5NDU3NTkyMzg2fX0=",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "traceparent": "00-1c4332bf231b48a84ebd9001ab5e40c0-1640ac91d5573b1f-01",
    "tracestate": "882287@nr=0-1-882287-305875865-1640ac91d5573b1f----1609457592386",
    "x-csrf-token": "WhPy9ignynFvCgKzI6xaWMxfjC31HCO8hmyuaNnjobpjE10pq/3ODs6WGrACYyzf62FnIezfFHoQfCVNaG552Q==",
    "cookie": "locale=en; visid_incap_1566037=VvgUdc4SQbGVf7lsBnWzy0F2418AAAAAQUIPAAAAAACVOdEry9DxPf7vnlQwnH9H; _gcl_au=1.1.926235125.1608742468; _ga=GA1.2.1321988391.1608742468; _hjid=75c4683e-2652-4f37-b1ae-10c37d0e0713; _fbp=fb.1.1608742468878.379402461; aam_uuid=67503870824954137194185267169974957558; com.silverpop.iMAWebCookie=5461d214-22b0-c9e6-7608-9c3abb690031; cookieconsent_status=dismiss; aam_uuid=67503870824954137194185267169974957558; at_check=true; AMCVS_AF963DE55A38EC390A495CD5%40AdobeOrg=1; branding=; nlbi_1566037=l3eZBb0e1DVX65TVjlQg0QAAAABW8GrUz/1l0t3e0+OlXyxd; incap_ses_981_1566037=laEsJ/lLLStb15FphTadDaNe7l8AAAAAm53FfWVXm2hrmwKF+DNAzw==; mboxEdgeCluster=34; _gid=GA1.2.527099088.1609457317; s_cc=true; _hjTLDTest=1; _hjAbsoluteSessionInProgress=0; com.silverpop.iMA.session=5d008dc7-d0ab-a08e-281e-aec197c878e9; check=true; _hjIncludedInSessionSample=0; AMCV_AF963DE55A38EC390A495CD5%40AdobeOrg=-432600572%7CMCIDTS%7C18627%7CMCMID%7C67350081031077713204236956203289002905%7CMCAAMLH-1610062172%7C9%7CMCAAMB-1610062172%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1609464572s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.5.2%7CMCCIDH%7C-396801867; amp-prod-session_cart=3zhXA4cMvQMh%2FAgi%2Fvp3JnZiosbE%2F6saRyRk1tJunWSxUSHRotxo1wUnrI%2BUCTguUNCl4cAlvWzQUpNYCpWbgibrytCN67y21dDHGtY7nLMNE2l6iD%2BcAnJYcgzJPobrzYMPyfRxv4gPPjA%2BWB9OdtZMKR9TLYeUFV%2FmiBGn3i5CbgAoLszEfzfg8078LpTeLXy46LJ624IcbnQbBAfYA%2B%2BjnxRpIZu1Vh7rZmZzEFjr%2B%2FLcCK6ngwpftYoSqjkdlqKg7sSBw2K2sy3TUh5mITx3GTTAJ26BeuFFXyP2B3DK3iFzb0Gvzs7WWrvjeH5BqspEkILD3e0brKcCqtrrKgVC%2FcYyNHLzoOUtBpQgzALhLBN58fdb2kLrVCFMS2HTswbJ6%2F0OOaclXzLwG2jp1Ta76eokO7x%2FAXL8lrkgfOBl8kSHhnlqz8gxMl6GwzzDfAxHp1ZycDiD%2Feo%3D--yi7dRsO72NVq9qpB--GQvCYcZJn0E6mOXPNoBNEA%3D%3D; amp-state={%22session%22:{%22lastUpdated%22:1609457378492%2C%22updating%22:false}%2C%22activeItem%22:{%22internalId%22:null%2C%22isEditing%22:false}}; mbox=PC#e9a304e141be4759bc77762b3e727ab0.34_0#1672702179|session#eb86c7e80e394bcea3a09af483e90a75#1609459177; _uetsid=e838d0f04bbf11eb933c0f14793b9cc4; _uetvid=3cac90d038b711eb9fec072fe1013601; s_c15=account.ikonpass%7Cen%7Clogin; com.silverpop.iMA.page_visit=1169047474:47:; _gat_UA-110728242-1=1; s_sq=AMCalterraglobalprod%252CAMCikonpassglobalprod%252CAMCikonpassprod%3D%2526c.%2526a.%2526activitymap.%2526page%253Daccount.ikonpass%25257Cen%25257Clogin%2526link%253DLOG%252520IN%2526region%253Dscrolling-body%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Daccount.ikonpass%25257Cen%25257Clogin%2526pidt%253D1%2526oid%253DLOG%252520IN%2526oidt%253D3%2526ot%253DSUBMIT; session=%7B%22expiry_time%22%3A15%2C%22warning_time%22%3A1%2C%22expires_at%22%3A%222020-12-31T23%3A48%3A12.349%2B00%3A00%22%2C%22authenticated%22%3Afalse%7D; PROD-XSRF-TOKEN=WhPy9ignynFvCgKzI6xaWMxfjC31HCO8hmyuaNnjobpjE10pq%2F3ODs6WGrACYyzf62FnIezfFHoQfCVNaG552Q%3D%3D; _itw_iaa_prod_session=ubEi3q6LdQuWnAyCaYMySDhpPbD3%2F8071N%2FIkECSn%2F1QxmfSCuCW5lu349l%2BabV2yhDjVmXRhmG%2B7JF%2FAJKzqQ0TeQSWpWxGgFegZxgAx3MdraGR8QwqtuU7ocPfC93p6XfxyuZIn3gRyKHpc4wkakVvDWpPYF%2FQhjfrUQu3VP%2BJCr%2FLsI4E92QO12o0onitk5V9MTrwsd8LE%2B28K5iar1hpDbtpvV246rOlJNAYhea6XLWe%2F%2FHKzytrM%2FadlSdOIecC1vHfgFVpotnH8MPgPVXZGVFu4KNxEsHvBB%2FbmcsU6jRYcrIRqRKT2tUaALARcbuF--Us%2BNmy0eZiKUmiQj--BXmvMD9nydVjyG4EnsnOOA%3D%3D"
  },
  "referrer": "https://account.ikonpass.com/en/login",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": `{"email":${email}, "password":${password}}`,
  "method": "PUT",
  "mode": "cors"
})
  .then(response => console.log(response.headers.get("set-cookie")))
  .catch(err => console.log("error ->", err))

}


fetchCookie();

module.exports = fetchCookie;