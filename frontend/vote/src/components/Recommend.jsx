import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { VotingContractAddress, AirdropContractAddress } from "../constants/constants";

import VoteAbi from "../constants/voteAbi.json";
import '../styles/Recommend.css'

import { ConnectContext } from "../context/ConnectContext";
import styled from "styled-components";

import { create as ipfsHttpClient } from "ipfs-http-client";


const ipfs = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Recommend() {
  const { currentAccount } = useContext(ConnectContext);

  const [election, setElection] = useState({
    details: "",
    address: "",
  });
  const [candidates, setCandidates] = useState([])
  const [candidate, setCandidate] = useState("");

  function handleChange(event) {
    const { name, value } = event.target
    setElection(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const addCandidate = (event) => {
    event.preventDefault();
    setCandidates(prev => [...prev, candidate]);
  }
  const removeCandidate = (id) => {
    // event.preventDefault();
    candidates.splice(id, 1)
    let arr = [...candidates]
    console.log(arr, id)
    setCandidates(arr);
    console.log(candidates)
  }
  //delete item from array using index
 
  const createElection = async () => {

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
        const tx = await voteContract.setUp(election.address, election.details, candidates);
        const receipt = await tx.wait();
        console.log(receipt);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>

      <div className="section">

        <div className="title">
          <h2 style={{ textAlign: "center" }}>Create An Election</h2>
        </div>
        <div className="main" style={{ marginTop: "20px" }}>
          <div className="formControl">
            <label htmlFor="Name" className="input-text">Election Title:  </label>
            <input type="text" name="details" placeholder="Name" className="rounded-input" onChange={handleChange} />

            <label htmlFor="CAaddress" className="input-text">Token/NFT Address: </label>
            <input type="text" name="address" placeholder="Enter contract Address" className="rounded-input" onChange={handleChange} />
            <label htmlFor="candidate" className="input-text">Add Candiddate: </label>
            <div style={{ display: "flex" }}><input type="text" placeholder="Enter Candidate Name" className="rounded-input" style={{ width: "50%" }} onChange={(e)=> setCandidate(e.target.value)} />
              <button className="addBtn" onClick={addCandidate} style={{ padding: "0" }} >Add Candidate</button> </div>
            <ul style={{marginBottom: "10px"}}>{candidates.map((name, index) => <li className="list" key={index}> {name} <span class="closeList" onClick={() => removeCandidate(index)}>×</span></li>)}</ul>
            <button className="createBtn" onClick={createElection}>Create Election</button>
          </div>
        </div>
      </div>
    </div>
  );
}