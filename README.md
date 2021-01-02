# ski-scraper
Get an alert when your specified ski days become available

Please add the following values to your .env file that you created within the worker directory.  

`TELEGRAM_TOKEN=[THE BOT TOKEN GOES HERE]`
`MARK_TELEGRAM_CHAT_ID=[YOUR CHAT ID GOES HERE]`
`JOHN_TELEGRAM_CHAT_ID=[YOUR CHAT ID GOES HERE]`


/* TODO: 
    - Check for historic dates...only query ${today} forward
    - Add a reasonable "lead" window...I don't want to be notified day-of, 20 minutes before lifts start
    - Need to add redis to toggle ["hasBeenNotified"]
    - Double check the resort data...what's the deal with that [0]?
*/