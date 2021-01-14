const express = require('express');
const { get } = require('http');
const { delay } = require('../worker/utils');
const app = express();

const port = 3001;

var redis = require('redis'), client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

const getRedisKeys = async keys => {
    await keys
    return keys
}


const getSkiDates = async _ => {

    let redisKeys

    client.keys('*', async function (err, keys) {
        if (err) return console.log(err);

        redisKeys = await getRedisKeys(keys)
 
    })

    await delay()
    await redisKeys
    return redisKeys

}


app.get('/api/userDesiredSkiDates', async (req, res) => {
    
    let skiDates = await getSkiDates()
    console.log("did it work", skiDates)
    
    res.header('Access-Control-Allow-Origin', "http://localhost:3000")
    res.send(skiDates)
});

app.listen(port, () => console.log(`Ski scraper listening on port ${port}!`))