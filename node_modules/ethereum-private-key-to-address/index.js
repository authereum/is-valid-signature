const { publicKeyConvert, publicKeyCreate } = require('secp256k1')
const keccak256 = require('keccak256')
const { toChecksumAddress } = require('ethereum-checksum-address')

function privateKeyToAddress (privateKey) {
  if (!Buffer.isBuffer(privateKey)) {
    if (typeof privateKey !== 'string') {
      throw new Error('Expected Buffer or string as argument')
    }

    privateKey = Buffer.from(stripHexPrefix(privateKey), 'hex')
  }

  const publicKey = privateToPublicKey(privateKey)
  return publicKeyToAddress(publicKey)
}

function publicKeyToAddress (publicKey) {
  publicKey = publicKeyConvert(publicKey, false)
  return bufferToAddress(keccak256(publicKey.slice(1)).slice(-20))
}

function privateToPublicKey (privateKey) {
  return publicKeyCreate(privateKey, false)
}

function bufferToAddress (buf) {
  return toChecksumAddress(buf.toString('hex'))
}

function stripHexPrefix (value) {
  return value.slice(0, 2) === '0x' ? value.slice(2) : value
}

module.exports = privateKeyToAddress
