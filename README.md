# ski-scraper
Get an alert when your specified ski days become available

Please add the following values to your .env file that you created within the worker directory.  

`TELEGRAM_TOKEN=[THE BOT TOKEN GOES HERE]`
`MARK_TELEGRAM_CHAT_ID=[YOUR CHAT ID GOES HERE]`
`JOHN_TELEGRAM_CHAT_ID=[YOUR CHAT ID GOES HERE]`


/* TODO: 
    - Add a reasonable "lead" window...I don't want to be notified day-of, 20 minutes before lifts start
    - Need to add redis to toggle ["hasBeenNotified"]
    - Development bot that switches tester's telegram ID in environment variables?
    - Fix gh action to include our api
    - Fix gh action to run basic processes again: 
        - Remove ski scraper repo
        - scp it to server
        - npm i
        - pm2 flush
        - pm2 start worker/index.js --name ski-scraper
        - pm2 start api/index.js --name ski-scraper
    - Add testing to prevent bad pushes
*/