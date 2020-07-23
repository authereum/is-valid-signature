pragma solidity ^0.6.0;

import "./IERC1271.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

contract AccountMock is IERC1271 {
  using ECDSA for bytes32;

  address public owner;

  // bytes4(keccak256("isValidSignature(bytes,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;
  bytes4 constant internal INVALID_SIGNATURE = 0xffffffff;

  constructor(address _owner) public {
    owner = _owner;
  }

  function isValidSignature(
    bytes32 _messageHash,
    bytes memory _signature
  )
    public
    override
    view
    returns (bytes4 magicValue)
  {
    address signer = _messageHash.recover(_signature);
    if (signer == owner) {
      return MAGICVALUE;
    } else {
      return INVALID_SIGNATURE;
    }
  }
}
