var Alexa = require('alexa-sdk');
var http = require('http');

var APP_ID = undefined; // TODO Get app id

var messages = {
  introText: "Here's your joke. ",
  helpMessage: "You can ask for a Chuck Norris joke, or request a joke about a specific person. You can also ask for a nerdy joke or an explicit joke."
}

var handlers = {
  'LaunchRequest': function() {
    this.emit('randomJokeIntent');
  },
  'randomJokeIntent': function() {

  },
  'personJokeIntent': function() {

  },
  'categoryJokeIntent': function() {

  },
  'personCategoryJokeIntent': function() {

  },
  'AMAZON.HELPINTENT': function() {
    this.emit(':tell', messages.helpMessage);
  }
}

exports.handler = function(event, context, callback) {
  alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
}