const BN = require('bn.js')
const normalizeHex = require('normalize-hex')

function toHex (value = Buffer.alloc(0), opts = {}) {
  opts = {
    size: 0,
    addPrefix: false,
    evenLength: false,
    ...opts
  }

  let result = ''

  if (typeof value === 'number') {
    result = value.toString(16)
  } else if (typeof value === 'string') {
    if (value.startsWith('0x')) {
      result = normalizeHex(value)
    }

    if (!result) {
      result = Buffer.from(value, 'utf8').toString('hex')
    }
  } else if (typeof value === 'boolean') {
    result = value ? '1' : '0'
  } else if (typeof value === 'object') {
    if (Buffer.isBuffer(value)) {
      result = value.toString('hex')
    } else if (BN.isBN(value)) {
      result = value.toString(16)
    } else if (value instanceof Uint8Array) {
      result = Buffer.from([
        ...value
      ]).toString('hex')
    }
  }

  if (typeof result === 'string') {
    result = result.toLowerCase()

    if (opts.size > result.length) {
      result = `${'0'.repeat(opts.size - result.length)}${result}`
    }

    if (opts.evenLength && result.length % 2) {
      result = `0${result}`
    }

    if (opts.addPrefix) {
      result = `0x${result}`
    }
  }

  return result
}

module.exports = toHex
