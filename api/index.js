const express = require('express');
const app = express();

const port = 3001;

var redis = require('redis'), client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/api/userDesiredSkiDates', async (req, res) => {

    const userDesiredSkiDates = await getAsync('userDesiredSkiDates');
    res.header('Access-Control-Allow-Origin', "http://localhost:3000")
    res.send(userDesiredSkiDates)
});

app.listen(port, () => console.log(`Ski scraper listening on port ${port}!`))