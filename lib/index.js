const ethers = require('ethers')
const ERC1271Abi = require('./abi/ERC1271.js')
const { utils } = ethers
const Buffer = require('buffer/').Buffer

const MAGICVALUE = '0x20c13b0b'

const isValidSignature = async (signerAddress, message, signature, provider) => {
  let rpcUrl = 'https://mainnet.infura.io'

  if (!provider) {
    provider = rpcUrl
  } else if (provider.currentProvider) {
    provider = provider.currentProvider
  } else if (provider.connection) {
    provider = provider.connection
  }

  if (provider.host) {
    rpcUrl = provider.host // web3
  } else if (provider.url) {
    rpcUrl = provider.url // ethers
  } else if (typeof provider === 'string' && provider.indexOf('http') === 0) {
    rpcUrl = provider // url
  }

  provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  if (!utils.getAddress(signerAddress)) {
    throw new Error('Invalid signer address')
  }

  if (!utils.isHexString(signature)) {
    throw new Error('Signature must be a hex string')
  }

  let msgBytes = null
  // Set msgBytes as Buffer type
  if (Buffer.isBuffer(message)) {
    msgBytes = message
  } else if (typeof message === 'string') {
    if (utils.isHexString(message)) {
      msgBytes = Buffer.from(message.substring(2), 'hex')
    } else {
      msgBytes = Buffer.from(message)
    }
  } else {
    throw new Error('Message must be string or Buffer')
  }

  // Convert Buffer to ethers bytes array
  msgBytes = ethers.utils.arrayify(msgBytes)
  const bytecode = await provider.getCode(signerAddress)

  if (!bytecode || bytecode === '0x' || bytecode === '0x0' || bytecode === '0x00') {
    const sigBytes = ethers.utils.arrayify(signature)
    const msgSigner = utils.verifyMessage(msgBytes, sigBytes)
    return msgSigner.toLowerCase() === signerAddress.toLowerCase()
  } else {
    const contract = new ethers.Contract(signerAddress, ERC1271Abi, provider)
    const returnValue = await contract.isValidSignature(msgBytes, signature)

    return returnValue.toLowerCase() === MAGICVALUE
  }
}

module.exports = isValidSignature