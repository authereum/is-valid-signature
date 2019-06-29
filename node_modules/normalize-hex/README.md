# normalize-hex

> Normalize a hex string

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/normalize-hex/master/LICENSE)
[![NPM version](https://badge.fury.io/js/normalize-hex.svg)](http://badge.fury.io/js/normalize-hex)

## Install

```bash
npm install normalize-hex
```

## Getting started

```javascript
const normalizeHex = require('normalize-hex')

console.log(normalizeHex('abc')) // 'abc'
console.log(normalizeHex('abc', { evenLength: true })) // '0abc'
console.log(normalizeHex('abc', { addPrefix: true })) // '0xabc'
console.log(normalizeHex('abc', { evenLength: true, addPrefix: true })) // '0x0abc'
console.log(normalizeHex('0xabc')) // 'abc'
console.log(normalizeHex('')) // '0'
console.log(normalizeHex('', { evenLength: true, addPrefix: true })) // '0x00'
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
