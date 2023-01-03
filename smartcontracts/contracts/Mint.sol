// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Mint is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("WAVES BusinessCard NFT v1", "WBN") {}

    function getCurrentId() public view returns (uint256) {
      return _tokenIds.current();
    }

    function mint(address to)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, "https://waves-jp.com/api/tokenuri/1");

        _tokenIds.increment();

        return newItemId;
    }
}
