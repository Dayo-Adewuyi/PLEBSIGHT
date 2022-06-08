//SPDX-License-Identifier: MIT;

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
interface IERC20{
    function balanceOf(address owner) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from,address to,uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

interface IERC721{
    function balanceOf(address owner) external view returns (uint256);
    function setApprovalForAll(address operator, bool _approved) external;
    function safeTransferFrom(address from,address to,uint256 tokenId) external;
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
}

contract Vote is Pausable {
    constructor (){}

    uint public candidateId = 0;
    uint public electionId= 0;
    mapping (uint => Election) allElections;
    mapping(uint => Candidate) allCandidates;
    mapping(uint => mapping(address => bool)) public voted;


    struct Election {
        uint electionId;
        address creator;
        address identifier;
        string details;
        uint time;
        bool active;
      
        }

    struct Candidate{
        uint electionId;
        uint candidateId;
        string name;
        uint vote;
    }

    function setUp( address _identifier, string memory _details, uint _time , string[] calldata _candidate) public {   
       electionId++;
       allElections[electionId] = Election(
                                            electionId,
                                            msg.sender,
                                            _identifier,
                                            _details,
                                            _time,
                                            false
                                            );
        

        for(uint i = 0; i < _candidate.length; i++){
            candidateId++;
            Candidate memory candidate = Candidate(electionId,candidateId,_candidate[i],0);
            allCandidates[candidateId] = candidate;
        }
    }

    function start(uint _electionId, uint _time) public {
        require(allElections[_electionId].creator == msg.sender, "only creators can start an election");
        allElections[_electionId].active = true;
        allElections[_electionId].time = block.timestamp + _time;
    }
    
    function vote(uint _candidateId,uint _electionId ) public {
        require( block.timestamp < allElections[_electionId].time , "deadline already passed");
        require(voted[_electionId][msg.sender] == false, "you have already voted");
        require(allElections[_electionId].active == true, "election have not begun");
        address identifier = allElections[_electionId].identifier;
        require(IERC20(identifier).balanceOf(msg.sender) > 0 || IERC721(identifier).balanceOf(msg.sender) > 0,"only registered voters can vote");

        allCandidates[_candidateId].vote++;


        voted[_electionId][msg.sender] = true;
    }
  
}