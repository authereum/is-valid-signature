pragma solidity ^0.6.0;

import "./IERC1271Bytes.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

contract AccountMockBytes is IERC1271Bytes {
  using ECDSA for bytes32;

  address public owner;

  // bytes4(keccak256("isValidSignature(bytes,bytes)")
  bytes4 constant internal MAGICVALUE = 0x20c13b0b;
  bytes4 constant internal INVALID_SIGNATURE = 0xffffffff;

  constructor(address _owner) public {
    owner = _owner;
  }

  function isValidSignature(
    bytes memory _message,
    bytes memory _signature
  )
    public
    override
    view
    returns (bytes4 magicValue)
  {
    bytes32 messageHash = keccak256(abi.encodePacked(_message));
    address signer = messageHash.recover(_signature);
    if (signer == owner) {
      return MAGICVALUE;
    } else {
      return INVALID_SIGNATURE;
    }
  }
}
