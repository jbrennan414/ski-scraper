# ski-scraper
Get an alert when your specified ski days become available

Please add the following values to your .env file that you created within the worker directory.  

`TELEGRAM_TOKEN=[THE BOT TOKEN GOES HERE]`
`MARK_TELEGRAM_CHAT_ID=[YOUR CHAT ID GOES HERE]`
`JOHN_TELEGRAM_CHAT_ID=[YOUR CHAT ID GOES HERE]`


# Set up redis
`brew install redis`

You'll need an instance of redis server running, so fire that up:
`redis-server`

By default redis will be empty...so you'll need to run a script with some 
seed data. Fire up the api node api/index.js, uncomment the `populateRedis()` line in 
`checkDates.js`, and run `node worker/index.js` to populate redis. 

If you've run this previously, you can leave `populateRedis()` commented out, but follow
the rest of the instructions above. 

To view the current state of the redis cache, run:
`redis-cli`
> GET userDesiredSkiDates

