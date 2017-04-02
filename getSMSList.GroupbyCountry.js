// Download the Node helper library from twilio.com/docs/node/install
//This snipped is based on the latest node library for twilio, so install the next gen version .
//You can do this by doing  “  sudo npm install twilio@3.0.0-rc.15 -g —save "


//Also download underscore.js package
//You can do this by doing  “  sudo npm install underscore -g —save "

// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken =  process.env.TWILIO_AUTH_TOKEN;

var Twilio=require('twilio');
var twilio = new Twilio(accountSid, authToken);

var underScore = require("underscore");

var filter='';


function enhanceData(smsLog)
{
       return new Promise (function(resolve, reject)
                                               {
                                                 var iterationCounter=0;
                                                 var lookUpDone=0;
                                                 underScore.each(smsLog,function(message)
                                                 {
                                                     if(message.length === 0 )
                                                     {
                                                       return("Empty Log");
                                                       reject(smsLog);
                                                     }
                                                     else
                                                     {
                                                          iterationCounter+=1;
                                                          lookedup = twilio.lookups.v1.phoneNumbers.get(message.from).fetch();
                                                          lookedup.then( function(number)
                                                                                   {

                                                                                        message["ISOCountryCode"]=number.countryCode;
                                                                                         lookUpDone+=1;
                                                                                        if(smsLog.length === iterationCounter)
                                                                                          {
                                                                                            if (lookUpDone === iterationCounter)
                                                                                            {
                                                                                                 resolve(smsLog);
                                                                                            }
                                                                                          }

                                                                                      }
                                                                         )
                                                                    .catch(function(numberNotFound)

                                                                                       {
                                                                                        message["ISOCountryCode"]=message.from;
                                                                                        lookUpDone+=1;
                                                                                        if(smsLog.length === iterationCounter)
                                                                                          {
                                                                                            if (lookUpDone === iterationCounter)
                                                                                            {
                                                                                                 resolve(smsLog);
                                                                                            }
                                                                                          }
                                                                                       }
                                                                              );

                                                     }
                                                  });
                                                }
                                              );


}




if (process.argv.length === 3)
{
    filter=JSON.parse(process.argv[2]);
    console.log("Filter : " + filter);
}



gotAllMessages = twilio.messages.list(filter) ;
gotAllMessages.then(function(messages)
                    {
                         console.log("Got All Messages "+messages.length);
                         console.log("Enriching SMS Log by Country Code");
                         enchancedAllRecords = enhanceData(messages);
                         enchancedAllRecords.then(function(enhancedSMSLog)
                                                     {
                                                          console.log("SMS Count Grouped by Country/SenderID c:")
                                                          console.log(underScore.countBy(enhancedSMSLog,'ISOCountryCode'));
                                                     },
                                                     function(origSMSLog)
                                                     {
                                                         console.log('No Records Found ')
                                                     }
                                 )
                    })
              ;
