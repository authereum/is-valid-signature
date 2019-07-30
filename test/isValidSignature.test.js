const isValidSignature = require('..')

const { fromRpcSig, toBuffer, ecrecover } = require('ethereumjs-util')
const { expect } = require('chai')
const utils = require('@authereum/utils')
const web3Utils = require('web3-utils')

const AccountMock = artifacts.require('AccountMock')

contract('isValidSignature', (accounts) => {

  let signer, message, messageHash, messageSignature, messageHashSignature
  beforeEach(async () => {
    signer = accounts[0]
    message = "Hello world"
    messageHash = await utils.soliditySha3(message)

    messageSignature = await web3.eth.sign(message, signer)
    messageSignature = normalizeSignature(messageSignature)

    messageHashSignature = await web3.eth.sign(messageHash, signer)
    messageHashSignature = normalizeSignature(messageHashSignature)
  })

  describe('when signing a hash', () => {
    it('should check externally owned account signature', async () => {
      expect(await isValidSignature(web3, signer, messageHash, messageHashSignature)).to.equal(true)
    })
  
    it('should check ERC1271 signature', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(web3, contract.address, messageHash, messageHashSignature)).to.equal(true)
    })  
  })

  describe('when signing a string', () => {
    it('should check externally owned account signature', async () => {
      expect(await isValidSignature(web3, signer, message, messageSignature)).to.equal(true)
    })
  
    it('should check ERC1271 signature', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(web3, contract.address, message, messageSignature)).to.equal(true)
    })  
  })
  
})

const normalizeSignature = (signature) => {
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