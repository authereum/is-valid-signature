const meow = require('meow')
const privateKeyToAddress = require('.')

const cli = meow(`
    Usage
      $ ethereum_private_key_to_address <private-key>

    Examples
      $ ethereum_private_key_to_address 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
      0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
`, {
  flags: {}
})


const privateKey = cli.input[0]

if (!privateKey) {
  console.log('private key argument is required')
  process.exit(1)
}

console.log(privateKeyToAddress(privateKey))
