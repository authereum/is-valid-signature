pragma solidity 0.5.8;

import "./IERC1271.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

contract AccountMock is IERC1271 {
  using ECDSA for bytes32;

  address public owner;

  // bytes4(keccak256("isValidSignature(bytes,bytes)")
  bytes4 constant internal MAGICVALUE = 0x20c13b0b;
  bytes4 constant internal INVALID_SIGNATURE = 0xffffffff;

  constructor(address _owner) public {
    owner = _owner;
  }

  function isValidSignature(
    bytes memory _data,
    bytes memory _signature
  )
    public
    view
    returns (bytes4 magicValue)
  {
    bytes32 messageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _data));
    address signer = messageHash.recover(_signature);
    if (signer == owner) {
      return MAGICVALUE;
    } else {
      return INVALID_SIGNATURE;
    }
  }
}