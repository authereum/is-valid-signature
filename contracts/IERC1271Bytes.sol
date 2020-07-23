pragma solidity ^0.6.0;

interface IERC1271Bytes {
  function isValidSignature(
    bytes memory _messageHash,
    bytes memory _signature)
    external
    view
    returns (bytes4 magicValue);
}