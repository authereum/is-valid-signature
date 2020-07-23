pragma solidity ^0.6.0;

import "./IERC1271Bytes.sol";
import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";

contract AuthereumV1Mock is IERC1271Bytes {
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
    override
    view
    returns (bytes4 magicValue)
  {
    bytes32 messageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", uint2str(_data.length), _data));
    address signer = messageHash.recover(_signature);
    if (signer == owner) {
      return MAGICVALUE;
    } else {
      return INVALID_SIGNATURE;
    }
  }

  function uint2str(uint _num) internal pure returns (string memory _uintAsString) {
    if (_num == 0) {
        return "0";
    }
    uint i = _num;
    uint j = _num;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len - 1;
    while (i != 0) {
        bstr[k--] = byte(uint8(48 + i % 10));
        i /= 10;
    }
    return string(bstr);
  }
}
