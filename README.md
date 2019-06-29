# is-valid-signature

Check if a signature is valid for an Ethereum address. Works for both [externally owned accounts](http://ethdocs.org/en/latest/contracts-and-transactions/account-types-gas-and-transactions.html#externally-owned-accounts-eoas) and [contract accounts](http://ethdocs.org/en/latest/contracts-and-transactions/account-types-gas-and-transactions.html#contract-accounts) that follow the [ERC1271 standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1271.md).

[![npm version](https://badge.fury.io/js/is-valid-signature.svg)](https://badge.fury.io/js/is-valid-signature)

## Install

```bash
npm install is-valid-signature
```

## Getting started

Check signatures for externally owned accounts

```javascript
const isValidSignature = require('is-valid-signature')

const signer = YOUR_SIGNER_ADDRESS

// Get a signature
const message = web3.utils.soliditySha3("Hello world")
const signature = await web3.eth.sign(message, signer)

// Check if the signature is valid
const isValid = await isValidSignature(web3, signer, message, signature)
```

Check signatures for [ERC1271](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1271.md) contracts

```javascript
const isValidSignature = require('is-valid-signature')

const signer = YOUR_SIGNER_ADDRESS

// Get contract where `signer` can sign on behalf of contract
const contract = ERC1271.at(YOUR_CONTRACT_ADDRESS)

// Get a signature
const message = web3.utils.soliditySha3("Hello world")
const signature = await web3.eth.sign(message, signer)

// Check if the signature is valid
const isValid = await isValidSignature(web3, contract.address, message, signature)
```


## Test

```bash
npm test
```

## License

[MIT](LICENSE)