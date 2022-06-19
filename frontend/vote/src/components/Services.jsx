import React from "react";
import styled from "styled-components";
import {useState, useEffect, useContext} from "react"
import avatarImage from "../assets/avatarImage.jpeg";
import VoteAbi from  "../constants/voteAbi.json";
import { ethers } from "ethers";
import { VotingContractAddress, AirdropContractAddress } from "../constants/constants";
import "../styles/Services.css";
import {CgProfile} from "react-icons/cg";

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
        console.log(tx)
      }}catch(err){
        console.log(err)
      }
    }
  useEffect(()=>{
    fetchMyElection()
  }, [])
    const startElection = async(id) => {

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

 const endElection = async(id) => {

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



  return (
    
        <div className="grid">
            
             {election.map((element, index)=>{
  return(
    <div class="grid__item" key = {index}>
    <div class="card"><img class="card__img" src="https://images.unsplash.com/photo-1603032813605-2c91e257e2ae?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80" alt="Desert" />
    <div class="card__content">
          <h1 class="card__header">Title: {element.details} </h1>
          <p class="card__text"> {element.candidates.length} Candidates </p>
          {element.candidates.map((candidate, index)=>{
          return(
            <ul key = {index}>
              <li>  <CgProfile/> {candidate.name}</li>
            
              

              </ul>
          )})}
          {element.active? <button class="card__btn" onClick = {()=>endElection(Number(element.electionId))}>End <span>&rarr;</span></button>:<button class="card__btn" onClick={()=>startElection(Number(element.electionId))}>Start <span>&rarr;</span></button>}
      
    
     

    </div>
    </div>
    </div>
   
  )
})}


        </div>
       
   
  );
}

