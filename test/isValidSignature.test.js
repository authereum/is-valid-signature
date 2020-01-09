const isValidSignature = require('..')

const { expect } = require('chai')
const utils = require('@authereum/utils')
const web3Utils = require('web3-utils')

const AccountMock = artifacts.require('AccountMock')

contract('isValidSignature', (accounts) => {

  let signer, message, messageHash, messageSignature, messageHashSignature, badMessage, badMessageHash, badMessageSignature, badMessageHashSignature
  before(async () => {
    signer = accounts[0]

    message = "Hello world"
    messageHash = await utils.soliditySha3(message)

    messageSignature = await web3.eth.sign(message, signer)
    messageSignature = normalizeSignature(messageSignature)

    messageHashSignature = await web3.eth.sign(messageHash, signer)
    messageHashSignature = normalizeSignature(messageHashSignature)

    // Bad messages for cases that return false
    badMessage = "Bad message"
    badMessageHash = await utils.soliditySha3(badMessage)

    badMessageSignature = await web3.eth.sign(badMessage, signer)
    badMessageSignature = normalizeSignature(badMessageSignature)

    badMessageHashSignature = await web3.eth.sign(badMessageHash, signer)
    badMessageHashSignature = normalizeSignature(badMessageHashSignature)
  })

  describe('when signing a hash', () => {
    // true cases
    it('should check externally owned account signature', async () => {
      expect(await isValidSignature(signer, messageHash, messageHashSignature, web3)).to.equal(true)
    })

    it('should check ERC1271 signature', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(contract.address, messageHash, messageHashSignature, web3)).to.equal(true)
    })

    // false cases
    it('should return false for externally owned account signature with bad data', async () => {
      expect(await isValidSignature(signer, badMessageHash, messageHashSignature, web3)).to.equal(false)
    })

    it('should return false for ERC1271 signature with bad data', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(contract.address, badMessageHash, messageHashSignature, web3)).to.equal(false)
    })

    it('should return false for externally owned account signature with bad signature', async () => {
      expect(await isValidSignature(signer, messageHash, badMessageHashSignature, web3)).to.equal(false)
    })

    it('should return false for ERC1271 signature with bad signature', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(contract.address, messageHash, badMessageHashSignature, web3)).to.equal(false)
    })
  })

  describe('when signing a string', () => {
    // true cases
    it('should check externally owned account signature', async () => {
      expect(await isValidSignature(signer, message, messageSignature, web3)).to.equal(true)
    })

    it('should check ERC1271 signature', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(contract.address, message, messageSignature, web3)).to.equal(true)
    })

    // false cases
    it('should return false for externally owned account signature with bad data', async () => {
      expect(await isValidSignature(signer, badMessage, messageSignature, web3)).to.equal(false)
    })

    it('should return false for ERC1271 signature with bad data', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(contract.address, badMessage, messageSignature, web3)).to.equal(false)
    })

    it('should return false for externally owned account signature with bad signature', async () => {
      expect(await isValidSignature(signer, message, badMessageSignature, web3)).to.equal(false)
    })

    it('should return false for ERC1271 signature with bad signature', async () => {
      contract = await AccountMock.new(signer)
      expect(await isValidSignature(contract.address, message, badMessageSignature, web3)).to.equal(false)
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