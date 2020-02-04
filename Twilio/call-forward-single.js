/**
 *  Call Forward Template
 *
 *  This Function will forward a call to a list of numbers one after the other.
 *  Each will ring for approx. 25s before forwarding to the next
 */

exports.handler = function(context, event, callback) {
  // set-up the variables that this Function will use to forward a phone call using TwiML

  // REQUIRED - you must set this
  let phoneNumber1 = context.PHONE_NUMBER1 || "NUMBER TO FORWARD TO";
  let phoneNumber2 = context.PHONE_NUMBER2;
  // OPTIONAL
  let callerId =  event.CallerId || null;
  // OPTIONAL
  let timeout = 20 || null;
  // OPTIONAL
  let allowedCallers = event.allowedCallers || [];

  // generate the TwiML to tell Twilio how to forward this call
  let twiml = new Twilio.twiml.VoiceResponse();

  let allowedThrough = true;
  if (allowedCallers.length > 0) {
    if (allowedCallers.indexOf(event.From) === -1) {
      allowedThrough = false;
    }
  }

  let dialParams = {};
  if (callerId) {
    dialParams.callerId = callerId
  }
  if (timeout) {
    dialParams.timeout = timeout
  }

  if (allowedThrough) {
    twiml.say('You have reached the DevOpsDays New York City 2020 Code of Conduct help line. Please stay on the line as we contact an organizer');
    twiml.dial(dialParams, phoneNumber1);
    twiml.dial(dialParams, phoneNumber2);
  }
  else {
    twiml.say('Sorry, you are calling from a restricted number. Good bye.');
  }

  // return the TwiML
  callback(null, twiml);
};
