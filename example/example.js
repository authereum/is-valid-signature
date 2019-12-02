const validateContractSignature = require('../')
const Web3 = require('web3')
const ethers = require('ethers')

;(async () => {
  // Contract-based account (web3)
  const account = '0x99bd0006D13542A0917Cf8F2F986Ca7667b84268'
  const data = '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'
  const signature = '0x0304494527023df3a811f5ad61aa35177a4455eb4bf098561f9380a574915f4c1ff4a5fc653afdfc086dcc9662848097703d18b82156618ccec1e5c9da7623e51b4760269d07f9a074dc2d6ab10cf52ff77852662e40fbb4b27289126a5bb538271e147c0952204161d710bb070a6e470b0b1ef65d11f1dc074e235e3dfaef00ae1b'

  const provider = new Web3.providers.HttpProvider('https://kovan.infura.io/c02fff6b5daa434d8422b8ece54c7286')
  const web3 = new Web3(provider)
  const verified = await validateContractSignature(account, data, signature, web3)

  console.log(verified) // true
})();

;(async () => {
  // Contract-based account (web3 provider)
  const account = '0x99bd0006D13542A0917Cf8F2F986Ca7667b84268'
  const data = '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'
  const signature = '0x0304494527023df3a811f5ad61aa35177a4455eb4bf098561f9380a574915f4c1ff4a5fc653afdfc086dcc9662848097703d18b82156618ccec1e5c9da7623e51b4760269d07f9a074dc2d6ab10cf52ff77852662e40fbb4b27289126a5bb538271e147c0952204161d710bb070a6e470b0b1ef65d11f1dc074e235e3dfaef00ae1b'

  const provider = new Web3.providers.HttpProvider('https://kovan.infura.io/c02fff6b5daa434d8422b8ece54c7286')
  const verified = await validateContractSignature(account, data, signature, provider)

  console.log(verified) // true
})();

;(async () => {
  // EOA (web3 provider)
  const account = '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
  const data = '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'
  const signature = '0x316cafc6438a1e5bc634c62e717fa64c4f66988d0fb2f4452a8c09a139c4c50d5ece0fafb6fc0e1e86a6356dc02b44f37aee668fdd82f1590c5d82f6b1a202961c'

  const provider = new Web3.providers.HttpProvider('https://kovan.infura.io/v3/c02fff6b5daa434d8422b8ece54c7286')
  const verified = await validateContractSignature(account, data, signature, provider)

  console.log(verified) // true
})();

;(async () => {
  // Contract-based account (ethers.js provider)
  const account = '0x99bd0006D13542A0917Cf8F2F986Ca7667b84268'
  const data = '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'
  const signature = '0x0304494527023df3a811f5ad61aa35177a4455eb4bf098561f9380a574915f4c1ff4a5fc653afdfc086dcc9662848097703d18b82156618ccec1e5c9da7623e51b4760269d07f9a074dc2d6ab10cf52ff77852662e40fbb4b27289126a5bb538271e147c0952204161d710bb070a6e470b0b1ef65d11f1dc074e235e3dfaef00ae1b'

  const provider = new ethers.providers.JsonRpcProvider('https://kovan.infura.io/v3/c02fff6b5daa434d8422b8ece54c7286')
  const verified = await validateContractSignature(account, data, signature, provider)

  console.log(verified) // true
})();

;(async () => {
  // Contract-based account (http provider url)
  const account = '0x99bd0006D13542A0917Cf8F2F986Ca7667b84268'
  const data = '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'
  const signature = '0x0304494527023df3a811f5ad61aa35177a4455eb4bf098561f9380a574915f4c1ff4a5fc653afdfc086dcc9662848097703d18b82156618ccec1e5c9da7623e51b4760269d07f9a074dc2d6ab10cf52ff77852662e40fbb4b27289126a5bb538271e147c0952204161d710bb070a6e470b0b1ef65d11f1dc074e235e3dfaef00ae1b'

  const provider = 'https://kovan.infura.io/v3/c02fff6b5daa434d8422b8ece54c7286'
  const verified = await validateContractSignature(account, data, signature, provider)

  console.log(verified) // true
})();
