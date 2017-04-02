# twilioSMSCountByCountryCode
This is a standalone script to retrieve Twilio SMS Logs for an account and get SMS Counts by Country Code.

If there is a requirement to do this , a recommended approach is to used StatusCallback Url to capture realtime Message states . StatusCallback Url gets information on "ToCountry" and "FromCountry" along with other parameters listed here. You could use this to create a realtime dashboard or store it in an internal database for offline reporting.

However, if you want to do this for existing records, this sample script could be used. This retrieves the SMS Logs , enriches the records by callign lookup API and then uses underscore.js to group the records by country code.

# Setup

```bash
      sudo npm install twilio@3.0.0-rc.15 -g —save
      sudo npm install underscore -g —sav  e
 
```



