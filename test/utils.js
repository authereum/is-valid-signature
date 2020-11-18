const web3Utils = require('web3-utils')

const normalizeSignature = signature => {
  // get the last byte in the signature
  let v = signature.slice(-2)
  // convert it to a number
  vNum = web3Utils.hexToNumber('0x' + v)
  // if version 0 or 1, change to 27 or 28
  if (vNum < 2) {
    vNum += 27
  }
  // change back to hex
  v = web3Utils.numberToHex(vNum)
  // remove '0x' prefix
  v = v.slice(2)
  // get entire signature except for v, the last byte
  signature = signature.slice(0, 130)
  // add on the updated v
  signature = signature.concat(v)
  return signature
}

module.exports = { normalizeSignature }
