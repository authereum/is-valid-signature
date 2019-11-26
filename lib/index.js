const Web3 = require('web3')
const ERC1271Abi = require('./abi/ERC1271.js')

const MAGICVALUE = '0x20c13b0b'
const removeHexPrefix = (str) => (str || '').replace(/^0x/, '')
const keccack256WithPrefix = (message) => {
  let size = Buffer.from(message).byteLength
  if (message.startsWith('0x')) {
    size = Buffer.from(removeHexPrefix(message), 'hex').byteLength
  }

  return keccack256(`\x19Ethereum Signed Message:\n${size}`, message)
}

const isValidSignature = async (provider, signerAddress, message, signature) => {
  if (typeof provider !== 'object') {
    throw new Error('Expected web3 or provider objct')
  }

  if (provider.currentProvider) {
    provider = provider.currentProvider
  }

  const web3 = new Web3(provider)

  // If message is not hex, convert it to hex
  if (!web3.utils.isHexStrict(message)) {
    message = web3.utils.stringToHex(message)
  }

  const bytecode = await web3.eth.getCode(signerAddress)

  if (!bytecode || bytecode === '0x' || bytecode === '0x0' || bytecode === '0x00') {
    const prefixedMessageHash = keccack256WithPrefix(message)
    const msgSigner = web3.eth.ecrecover(prefixedMessageHash, signature)
    return msgSigner.toLowerCase() === signerAddress.toLowerCase()
  } else {
    const contract = await new web3.eth.Contract(ERC1271Abi, signerAddress)
    const returnValue = await contract.methods.isValidSignature(message, signature).call()

    return returnValue.toLowerCase() === MAGICVALUE
  }
}

module.exports = isValidSignature