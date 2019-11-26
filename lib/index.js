const Web3 = require('web3')
const ERC1271Abi = require('./abi/ERC1271.js')

const MAGICVALUE = '0x20c13b0b'

const isValidSignature = async (provider, signerAddress, message, signature) => {
  if (typeof provider !== 'object') {
    throw new Error('Expected web3 or provider objct')
  }

  if (provider.currentProvider) {
    provider = provider.currentProvider
  }

  const web3 = new Web3(provider)

  if (!web3.utils.isAddress(signerAddress)) {
    throw new Error('Invalid signer address')
  }

  if (!web3.utils.isHexStrict(signature)) {
    throw new Error('Signature must be hex string')
  }

  if (typeof message !== 'string') {
    throw new Error('Message must be a string')
  }

  // If message is not hex, convert it to hex
  if (!web3.utils.isHexStrict(message)) {
    message = web3.utils.stringToHex(message)
  }

  const bytecode = await web3.eth.getCode(signerAddress)

  if (!bytecode || bytecode === '0x' || bytecode === '0x0' || bytecode === '0x00') {
    const msgSigner = await web3.eth.accounts.recover(message, signature)
    return msgSigner.toLowerCase() === signerAddress.toLowerCase()
  } else {
    const contract = await new web3.eth.Contract(ERC1271Abi, signerAddress)
    const returnValue = await contract.methods.isValidSignature(message, signature).call()

    return returnValue.toLowerCase() === MAGICVALUE
  }
}

module.exports = isValidSignature