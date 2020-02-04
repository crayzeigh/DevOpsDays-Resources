const https = require("https");

// Make sure to declare SLACK_WEBHOOK_PATH in your Environment
// variables at
// https://www.twilio.com/console/runtime/functions/configure

exports.handler = (context, event, callback) => {
  // Extract the bits of the message we want
  const { To, From, Body } = event;

  // Construct a payload for slack's incoming webhooks
  const slackBody = JSON.stringify({
    attachments: [
      {
        fallback: `${From}: ${Body}`,
        fields: [
          {
            title: "From",
            value: From,
            short: true
          },
          {
            title: "Message",
            value: Body,
            short: false
          }
        ],
        color: "danger"
      }
    ]
  });

  // Form our request specification
  const options = {
    host: "hooks.slack.com",
    port: 443,
    path: context.SLACK_WEBHOOK_PATH,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": slackBody.length
    }
  };

  // send the request
  const post = https.request(options, function(res) {
    console.log('message sent');
  });

  post.write(slackBody);
  post.end( function(close) {
      console.log('got to end');
      callback(null, new Twilio.twiml.VoiceResponse());
  });
};
