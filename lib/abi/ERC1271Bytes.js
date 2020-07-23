module.exports = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_messageHash",
        "type": "bytes"
      },
      {
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "isValidSignature",
    "outputs": [
      {
        "name": "magicValue",
        "type": "bytes4"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
