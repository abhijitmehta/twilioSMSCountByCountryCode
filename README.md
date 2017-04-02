# twilioSMSCountByCountryCode
This is a standalone script to retrieve Twilio SMS Logs for an account and get SMS Counts by Country Code.

If there is a requirement to do this , a recommended approach is to used StatusCallback Url to capture realtime Message states . StatusCallback Url gets information on "ToCountry" and "FromCountry" along with other parameters listed here. You could use this to create a realtime dashboard or store it in an internal database for offline reporting.

However, if you want to do this for existing records, this sample script could be used. This retrieves the SMS Logs , enriches the records by callign lookup API and then uses underscore.js to group the records by country code.

# Setup

```bash
      sudo npm install twilio@3.0.0-rc.15 -g —save
      sudo npm install underscore -g —sav  e
 
```

# Example run

With a Filter 
```bash
>node getSMSList.GroupbyCountry.js "{\"dateSent\":\"2017-03-15\"}"
Got All Messages 16
Enriching SMS Log by Country Code
SMS Count Grouped by Country/SenderID c:
{ GB: 7,
  'Messenger:933728746748088': 4,
  'Messenger:922267141233367': 2,
  DIAWI: 3 }
```

Without any Filter
```bash
>node getSMSList.GroupbyCountry.js
Got All Messages 741
Enriching SMS Log by Country Code
SMS Count Grouped by Country/SenderID c:
{ '36300': 2,
  US: 72,
  ABHIJIT: 26,
  GB: 366,
  'Messenger:933728746748088': 38,
  'SHOE STORE': 13,
  'Messenger:922267141233367': 55,
  DIAWI: 3,
  ABHIJITM: 82,
  CANSTOPME: 1,
  'ABHIJIT M': 26,
  'Messenger:913566888754207': 1,
  'messenger:933728746748088': 42,
  'Messenger:1196791923776576': 2,
  'Messenger:1239918596018854': 7,
  'messenger:10154147422919322': 1,
  'Messenger:+933728746748088': 1,
  'messenger:+10154147422919322': 1,
  'messenger:+933728746748088': 2,
 }
```

>Note : If the sender ID is anything except a valid number , that very sender id is used for group by ( see examples above)
