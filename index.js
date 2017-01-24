var Alexa = require('alexa-sdk');
var http = require('http');

var APP_ID = undefined; // TODO Get app id
var alexa;

var messages = {
  appName: "Norris Jokes",
  introText: "Here's your joke. ",
  helpMessage: "Welcome to Norris Jokes. You can ask for a Chuck Norris joke, or request a joke about a specific person. You can also ask for a nerdy joke. Would you like to hear a joke now?",
  errorMessage: "Sorry, there was an error while retrieving your joke. Please try again later.",
  unhandledErrorMessage: "We couldn't understand your request. Please try again.",
  cancelMessage: "Goodbye."
}


var handlers = {
  'LaunchRequest': function() {
    this.emit('AMAZON.HelpIntent');
  },
  'randomJokeIntent': function() {
    httpGet(null);
  },
  'personJokeIntent': function() {
    httpGet('firstName=' + this.event.request.intent.slots.person.value);
  },
  'categoryJokeIntent': function() {
    httpGet('limitTo=' + this.event.request.intent.slots.jokeCategory.value);
  },
  'AMAZON.HelpIntent': function() {
    this.emit(':ask', messages.helpMessage);
  },
  'AMAZON.YesIntent': function() {
    this.emit('randomJokeIntent');
  },
  'AMAZON.NoIntent': function() {
    this.emit('AMAZON.CancelIntent');
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', messages.cancelMessage);
  },
  'Unhandled': function() {
    this.emit(':tell', messages.unhandledErrorMessage);
  }
}

exports.handler = function(event, context, callback) {
  alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
}

function httpGet(query, callback) {
  var options = {
    host: 'api.icndb.com',
    path: '/jokes/random?escape=javascript' + (query ? '&' + query : ''),
    method: 'GET'
  };

  var req = http.request(options, (res) => {

        var body = '';

        res.on('data', (d) => {
            body += d;
        });

        res.on('end', function () {
          var res = JSON.parse(body);
          if( res.type === 'success' ) {
            alexa.emit(':tellWithCard', messages.introText + res.value.joke, messages.appName, res.value.joke);
          } else {
            alexa.emit(':tell', messages.errorMessage);
          }
        });

    });
    req.end();

    req.on('error', (e) => {
        console.error(e);
    });
}