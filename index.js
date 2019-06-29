const utils = require('@authereum/utils')
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

    const contract = await IERC1271.at(signerAddress)
    const returnValue = await contract.isValidSignature(message, signature)

    return returnValue == MAGICVALUE
  }
}

module.exports = isValidSignature