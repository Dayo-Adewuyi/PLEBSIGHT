import React from "react";
import styled from "styled-components";
import {useState, useEffect, useContext} from "react"
import avatarImage from "../assets/avatarImage.jpeg";
import VoteAbi from  "../constants/voteAbi.json";
import { ethers } from "ethers";
import { VotingContractAddress, AirdropContractAddress } from "../constants/constants";
import "../styles/Services.css";
import { ToastContainer, toast } from 'react-toastify';
import { FaLink } from "react-icons/fa";

import Confetti from 'react-confetti'


export default function Services() {
  // const [getWinner]=useContext(ConnectContext);
  
   const [election, setElection] = useState([])
    const [winner, setWinner] = useState({})
    const[details, setDetails] = useState("")
    const[id, setId] = useState(0)
    const[active, setActive] = useState(false)
    const[tree, setTree] = useState(false)

   const fetchWinner = async() => {
      try{
        const {ethereum} = window;
        if(ethereum){
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
          const winner = await voteContract.winningCandidate();
          setWinner(winner);
          setActive(true);
          setTree(true);

        }
      }catch(error){
        toast.error("Error fetching winner")
      }
    }
    const fetchMyElection = async() => {

      try{
        const { ethereum } = window;
  
        if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
        const tx = await voteContract.myElections();

        setElection(tx)
        
      
      }}catch(err){
        console.log(err)
      }
    }
  useEffect(()=>{
    fetchMyElection()
  }, [])
  // useEffect(()=>{
  //   view()},[])
    const startElection = async(id) => {
      const txt = toast.loading("starting election...")
      try{  
        const { ethereum } = window;
  
        if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
        const tx = await voteContract.start(id);
        toast.update(txt,{type: "success", render: "election has successfully begun", isLoading: false, autoClose: 5000,})
        setActive(false)
        setTree(false)
      }}catch(err){
        console.log(err)
      }
    }
  
    const view = () => {
      return(
        <div className="winner-container">
          <h3>The winner Of the Election with {(winner.vote).toNumber()} votes is</h3>
          <div className="winner-image">
            <img src={`https://ipfs.infura.io/ipfs/${winner.photoHash}`} alt="winner" />
            <p>{winner.name}</p>
            <p>Share result with frens <FaLink/> <img alt="" src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ipfs.infura.io/ipfs/"  + winner.photoHash}></img></p>
            <Confetti active={active} width={window.innerWidth} height={window.innerHeight} />
          </div>
        </div>
      )}
  


 const endElection = async(id) => {

  const txt = toast.loading("ending election...")
  try{  
    const { ethereum } = window;

    if(ethereum){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
    const tx = await voteContract.getWinner(id);
 
   toast.update(txt,{type: "success", render: "election has successfully ended", isLoading: false, autoClose: 5000,})
   setActive(true)
  }}catch(err){
    console.log(err)
  }
}



  return (
    
        <div className="grid">
            
             {election.map((element, index)=>{
  return(
    <div className="grid__item" key = {index}>
    <div className="card">
    <div className="card__content">
          <h1 className="card__header"> {element.details} </h1>
          
          <p className="card__text"> There are {element.candidates.length} Candidates </p>
          {element.candidates.map((candidate, index)=>{
          return(
            <ul key = {index}>
              <img src={`https://ipfs.infura.io/ipfs/${candidate.photoHash}` } width="50px" height="50px" alt="candidate"/>
              <li> {candidate.name}</li>
               
            
              

              </ul>
          )})}
          {element.active? <button className="card__btn" onClick = {()=>endElection(Number(element.electionId))}>End <span>&rarr;</span></button>:<button className="card__btn" onClick={()=>startElection(Number(element.electionId))}>Start <span>&rarr;</span></button>}
       
    
     

     </div>
    </div>
    </div>
   
  )
})}
{active? <button onClick={fetchWinner}>View Winner</button> : ""}
  {tree ? view() : ""}
<ToastContainer />
        </div>
       
   
  );
}

