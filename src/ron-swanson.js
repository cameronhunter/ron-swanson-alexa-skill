import { Skill, Launch, Intent } from 'alexa-annotations';
import Response, { say } from 'alexa-response';
import ssml from 'alexa-ssml-jsx';
import fetch from 'isomorphic-fetch';

const API_ENDPOINT = 'http://ron-swanson-quotes.herokuapp.com/v2/quotes';

@Skill
export default class RonSwanson {

  @Launch
  launch() {
    return this.getQuote().then(quote => Response.build({
      ask: (
        <speak>
          <s>Hello, I'm Ron Swanson. Here's one of my hilarious quotes.</s>
          <s>{quote}</s>
          <break time='1s' />
          <s>Would you like to hear another?</s>
        </speak>
      ),
      reprompt: 'Would you like to hear another hilarious quote?',
      card: {
        title: 'Ron Swanson',
        content: quote
      }
    }));
  }

  @Intent('quote', 'AMAZON.YesIntent')
  quote() {
    return this.getQuote().then(quote => Response.build({
      ask: (
        <speak>
          <s>{quote}</s>
          <break time='2s' />
          <s>Would you like to hear another?</s>
        </speak>
      ),
      reprompt: 'Would you like to hear another hilarious quote?',
      card: {
        title: 'Ron Swanson',
        content: quote
      }
    }));
  };

  getQuote() {
    return fetch(API_ENDPOINT).then(_ => _.json()).then(([quote]) => quote);
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return Response.build({
      ask: 'Hello, I\'m Ron Swanson and I\'m smarter than you. Would you like to hear one of my hilarious quotes?',
      reprompt: 'Would you like to hear one of my hilarious quotes?'
    });
  }

  @Intent('AMAZON.NoIntent', 'AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    return say('Great job, everyone. The reception will be held in each of our individual houses, alone.');
  }

}
