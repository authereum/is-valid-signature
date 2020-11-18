const isValidSignature = require('..')

const ethers = require('ethers')
const { expect } = require('chai')
const utils = require('@authereum/utils')

const AccountMockBytes = artifacts.require('AccountMockBytes')

contract('AccountMockBytes', accounts => {
  let signer
  let ethersSigningKey
  let message
  let messageHash
  let messageHashSignature
  let badMessage
  let badMessageHash
  let badMessageHashSignature

  before(async () => {
    const privateKey =
      '0xbd5d82a4c2a6bbd6f7308f2850989a670e097be87b9113ffaffc722e1bd9c239'
    ethersSigningKey = new ethers.utils.SigningKey(privateKey)
    signer = ethersSigningKey.address

    message = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('Hello world'))
    messageHash = await utils.soliditySha3(message)

    messageHashSignature = ethers.utils.joinSignature(
      ethersSigningKey.signDigest(messageHash, signer)
    )

    // Bad messages for cases that return false
    badMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('Bad message'))
    badMessageHash = await utils.soliditySha3(badMessage)

    badMessageHashSignature = ethers.utils.joinSignature(
      ethersSigningKey.signDigest(badMessageHash, signer)
    )
  })

  describe('when signing a hash', () => {
    // true cases
    it('should check ERC1271 signature', async () => {
      contract = await AccountMockBytes.new(signer)
      expect(
        await isValidSignature(
          contract.address,
          message,
          messageHashSignature,
          web3
        )
      ).to.equal(true)
    })

    // false cases
    it('should return false for ERC1271 signature with bad data', async () => {
      contract = await AccountMockBytes.new(signer)
      expect(
        await isValidSignature(
          contract.address,
          badMessageHash,
          messageHashSignature,
          web3
        )
      ).to.equal(false)
    })

    it('should return false for ERC1271 signature with bad signature', async () => {
      contract = await AccountMockBytes.new(signer)
      expect(
        await isValidSignature(
          contract.address,
          message,
          badMessageHashSignature,
          web3
        )
      ).to.equal(false)
    })
  })
})
