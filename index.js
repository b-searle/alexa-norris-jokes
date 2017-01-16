var Alexa = require('alexa-sdk');
var http = require('http');

var APP_ID = undefined; // TODO Get app id

var messages = {

}

var handlers = {
  'LaunchRequest': function() {
    this.emit(':tell', 'This is the Chuck Norris jokes Alexa skill.');
  }
}

exports.handler = function(event, context, callback) {
  alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
}