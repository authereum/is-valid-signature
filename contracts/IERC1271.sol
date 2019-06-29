pragma solidity 0.5.8;

contract IERC1271 {
  function isValidSignature(
    bytes32 _messageHash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}