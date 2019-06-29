# is-valid-email

Validate email address

# Install

```bash
npm install is-valid-email
```

# Usage

```javascript
var isValidEmail = require('is-valid-email');

isValidEmail('foo.bar-5@qux.com') // true
isValidEmail('foo+bar-5@qux.com') // true
isValidEmail('foo&bar-5@qux.com') // true
isValidEmail('foo...bar-5@qux.com') // false
isValidEmail('fooqux.com') // false
```

[RFC 2822 section 3.4.1 Addr-spec specification](http://tools.ietf.org/html/rfc2822#section-3.4.1)

# License

MIT
