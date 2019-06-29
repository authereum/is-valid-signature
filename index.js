const utils = require('@authereum/utils')
const web3Utils = require('web3-utils')
const truffleContract = require('truffle-contract')
const IERC1271Artifact = require('./build/contracts/IERC1271.json')

const MAGICVALUE = '0x20c13b0b';

async function isValidSignature(web3, signerAddress, message, signature) {

  const bytecode = await web3.eth.getCode(signerAddress)

  if (!bytecode || bytecode === '0x') {
    const prefixedMessageHash = utils.keccack256WithPrefix(message)
    const msgSigner = utils.ecrecover(prefixedMessageHash, signature)
    return msgSigner.toLowerCase() === signerAddress.toLowerCase()
  } else {
    const IERC1271 = truffleContract(IERC1271Artifact)
    IERC1271.setProvider(web3.currentProvider)

    // If v is 0 or 1, change to 27 or 28
    signature = normalizeSignature(signature)

    const contract = await IERC1271.at(signerAddress)
    const returnValue = await contract.isValidSignature(message, signature)

    return returnValue == MAGICVALUE
  }
}

function normalizeSignature(signature) {
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

module.exports = isValidSignature