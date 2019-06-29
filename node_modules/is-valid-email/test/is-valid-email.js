var test = require('tape');
var isValidEmail = require('../is-valid-email');

test('is valid email', function (t) {
  t.plan(7);

  t.equal(isValidEmail('foo.bar-5@qux.com'), true);
  t.equal(isValidEmail('foo+bar-5@qux.com'), true);
  t.equal(isValidEmail('foo&bar-5@qux.com'), true);
  t.equal(isValidEmail('foo...bar-5@qux.com'), false);
  t.equal(isValidEmail('fooqux.com'), false);
  t.equal(isValidEmail({}), false);
  t.equal(isValidEmail(3434), false);
});
