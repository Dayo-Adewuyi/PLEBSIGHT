import React from "react";
import styled from "styled-components";
import {useState, useEffect, useContext} from "react"
import avatarImage from "../assets/avatarImage.jpeg";
import VoteAbi from  "../constants/voteAbi.json";
import { ethers } from "ethers";
import { VotingContractAddress, AirdropContractAddress } from "../constants/constants";


export default function Services() {
  // const [myElections, startElection, getWinner]=useContext(ConnectContext);
   const [election, setElection] = useState([])
    const [winner, setWinner] = useState([])
    const[id, setId] = useState(0)

    const fetchMyElection = async() => {

      try{
        const { ethereum } = window;
  
        if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
        const tx = await voteContract.myElections();

        setElection(tx)
        render()
      }}catch(err){
        console.log(err)
      }
    }
  
    const startElection = async() => {

      try{  
        const { ethereum } = window;
  
        if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
        const tx = await voteContract.start(id);
        
      }}catch(err){
        console.log(err)
      }
    }
  
  
 console.log(election)

 const endElection = async() => {

  try{  
    const { ethereum } = window;

    if(ethereum){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
    const tx = await voteContract.getWinner(id);
    setWinner(tx)
  }}catch(err){
    console.log(err)
  }
}

const render = election.map((element)=>{
  return(
    <div key = {element.electionId}>
      <span>{element.electionId}</span>
      <p>the identifier for stakeholders is {element.identifier}</p>
      <p>Election name is {element.details}</p>
      <p>is the election active ? {element.active}</p>
      <div>
        {element.candidates?.map((candidate)=>{
          return(
            <div key = {candidate.candidateId}>
              <p>The candidates are:</p>
              <p>{candidate.candidateId}</p>
              <img src={avatarImage} alt="avatar" />
              <p>{candidate.name}</p>
              

              </div>
          )})}
      </div>
      <button onClick={startElection}>start</button>
                <button onClick = {endElection}>End</button>

    </div>
  )
})

  return (
    <Section className="testimonials">
        <div>
            <h3> <button onClick={fetchMyElection}>Click here to see Elections You Have Created</button> </h3> 
             {render}


        </div>
    </Section>
  );
}

const Section = styled.section`
   padding: 5rem 0;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   gap: 1rem;
   .service {
     display: flex;
    flex-direction: column;
    gap: 1rem;
     padding: 2rem;
     background-color: aliceblue;
     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
     transition: 0.3s ease-in-out;
     &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .icon {
      img {
        height: 2.4rem;
     }
     }
   }
   @media screen and (min-width: 280px) and (max-width: 720px) {
     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   }
   @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
   }
 `;
