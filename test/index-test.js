import test from 'ava';
import Request from 'alexa-request';
import { handler as Skill } from '..';

test('LaunchRequest', t => {
  const request = Request.launchRequest().build();
  return Skill(request).then(response => t.ok(response));
});

test('Quote intent', t => {
  const request = Request.intent('quote').build();
  return Skill(request).then(response => t.ok(response));
});
