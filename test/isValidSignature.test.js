const isValidSignature = require('..')

const { fromRpcSig, toBuffer, ecrecover } = require('ethereumjs-util')
const { expect } = require('chai')
const utils = require('@authereum/utils')

const AccountMock = artifacts.require('AccountMock')

const message = utils.soliditySha3("Hello world")

contract('isValidSignature', (accounts) => {

  let signer, signature
  beforeEach(async () => {
    signer = accounts[0]
    signature = await web3.eth.sign(message, signer)
  })

  it('should check externally owned account signature', async () => {
    expect(await isValidSignature(web3, signer, message, signature)).to.equal(true)
  })

  it('should check ERC1271 signature', async () => {
    contract = await AccountMock.new(signer)
    expect(await isValidSignature(web3, contract.address, message, signature)).to.equal(true)
  })
})