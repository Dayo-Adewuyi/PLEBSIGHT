// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

///@notice openzeppelin contract Ownable and Pausable
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

///@notice interface for ERC20 token
interface IERC20 {
    function balanceOf(address owner) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

///@notice interface for ERC721 token

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function setApprovalForAll(address _operator, bool _approved) external;

    function balanceOf(address owner) external view returns (uint256);
}

///@title Airdrop contract
///@dev Airdrop contract for tokens and NFTs
///@notice contract that enables distribution of tokens and NFTs
contract Airdrop is Ownable, Pausable {
    constructor() {}

    ///@notice address of tokens to be shared
    IERC20 public token;
    ///@notice address of nft to be shared
    IERC721 public nft;

    event Airdropped(address indexed from, address indexed to, uint value);

    ///@notice function to distribute tokens
    ///@param _token address of the token to be distributed
    ///@param _address address of the receivers
    ///@param _rewards amount of tokens to be distributed
    function airdrop(
        address _token,
        address[] calldata _address,
        uint256[] calldata _rewards
    ) external whenNotPaused {
        ///@notice address of token to be distributed
        token = IERC20(_token);

        ///@notice to check the token balance of the user
        require(token.balanceOf(msg.sender) > 0, "get more tokens");

        ///@notice to check that the list of addresses and corresponding rewards is the same
        require(
            _address.length == _rewards.length,
            "beneficiaries and token length must be equal."
        );

        ///@notice loop to tranfer the tokens to the beneficiaries
        for (uint i = 0; i < _address.length; i++) {
            uint256 userRewards = _rewards[i] * 10**18;

            token.transferFrom(msg.sender, _address[i], userRewards);

            emit Airdropped(msg.sender, _address[i], userRewards);
        }
    }

    ///@notice function to distribute nft
    ///@param _nft address of the nft to be distributed
    ///@param _address address of the receivers
    ///@param tokenId array of token ids to be distributed
    function nftdrop(
        address _nft,
        address[] calldata _address,
        uint256[] calldata tokenId
    ) external whenNotPaused {
        ///@notice address of nft to be distributed
        nft = IERC721(_nft);
        ///@notice to check the nft balance of the user
        require(nft.balanceOf(msg.sender) > 0, "get more tokens");
        ///@notice to check that the list of addresses and corresponding token ids is the same
        require(
            _address.length == tokenId.length,
            "beneficiaries and token length must be equal."
        );
        ///@notice loop to tranfer the nft to the beneficiaries
        for (uint i = 0; i < _address.length; i++) {
            nft.safeTransferFrom(msg.sender, _address[i], tokenId[i]);

            emit Airdropped(msg.sender, _address[i], tokenId[i]);
        }
    }

    ///@notice function to pause the contract
    function pause() public onlyOwner {
        _pause();
    }

    ///@notice function to unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }
}
