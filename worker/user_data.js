// Someday...this will be stored in redis
// but for now this is the best we've got

const userData = {
    "719487075:pass_type": 'base',
    "719487075:winterpark":"[2021-02-02, 2021-02-03,2021-02-04, 2021-02-05]",
    "719487075:taos":"[2021-03-01,2021-03-02, 2021-03-03, 2021-03-04]",
    "719487075:abasin":"[2021-04-01,2021-04-02,2021-04-03]",
    "782458934:pass_type":"full",
    "782458934:winterpark":"[2021-01-24,2021-01-25,2021-01-26]",
    "782458934:taos":"[2021-02-01,2021-02-02,2021-02-03]",
    "782458934:abasin":"[2021-03-01,2021-03-02,2021-03-03]"
}

module.exports = { userData: userData };