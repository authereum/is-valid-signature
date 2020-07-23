const isValidSignature = require('..')

const { expect } = require('chai')
const utils = require('@authereum/utils')
const { normalizeSignature }  = require('./utils.js')

const AuthereumV1Mock = artifacts.require('AuthereumV1Mock')

contract('AuthereumV1', (accounts) => {

  let signer
  let message
  let messageHash
  let messageSignature
  let messageHashSignature
  let badMessage
  let badMessageHash
  let badMessageSignature
  let badMessageHashSignature

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
    it('should check ERC1271 signature', async () => {
      contract = await AuthereumV1Mock.new(signer)
      expect(await isValidSignature(contract.address, messageHash, messageHashSignature, web3)).to.equal(true)
    })

    // false cases
    it('should return false for ERC1271 signature with bad data', async () => {
      contract = await AuthereumV1Mock.new(signer)
      expect(await isValidSignature(contract.address, badMessageHash, messageHashSignature, web3)).to.equal(false)
    })

    it('should return false for ERC1271 signature with bad signature', async () => {
      contract = await AuthereumV1Mock.new(signer)
      expect(await isValidSignature(contract.address, messageHash, badMessageHashSignature, web3)).to.equal(false)
    })
  })

  describe('when signing a string', () => {
    // true cases
    it('should check ERC1271 signature', async () => {
      contract = await AuthereumV1Mock.new(signer)
      expect(await isValidSignature(contract.address, message, messageSignature, web3)).to.equal(true)
    })

    // false cases
    it('should return false for ERC1271 signature with bad data', async () => {
      contract = await AuthereumV1Mock.new(signer)
      expect(await isValidSignature(contract.address, badMessage, messageSignature, web3)).to.equal(false)
    })

    it('should return false for ERC1271 signature with bad signature', async () => {
      contract = await AuthereumV1Mock.new(signer)
      expect(await isValidSignature(contract.address, message, badMessageSignature, web3)).to.equal(false)
    })
  })
})
