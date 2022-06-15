import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import VoteAbi from "../constants/voteAbi";
import {VotingContractAddress } from "../constants/constants";

export const ConnectContext = React.createContext();

const { ethereum } = window;

const voteContract = () => {
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const voteContract = new ethers.Contract(VotingContractAddress, VoteAbi.abi, signer);
return voteContract;
}

const createElection = async(address,details,candidates) => {
  const contract = voteContract();
  try{
    const tx = await contract.setUp(address,details,candidates);
    const receipt = await tx.wait();
    console.log(receipt);
  }catch(err){
    console.log(err)
  }
}

const startElection = async(electionId) => {
  const contract = voteContract();
  try{
    const tx = await contract.start(electionId);
    const receipt = await tx.wait();
    console.log(receipt);
  }catch(err){
    console.log(err)
  }
}

const vote = async(electionId,candidateId) => {
  const contract = voteContract();
  try{
    const tx = await contract.vote(electionId,candidateId);
    const receipt = await tx.wait();
    console.log(receipt);
  }catch(err){
    console.log(err)
  }
}

const getWinner = async(electionId) => {
  const contract = voteContract();
  try{
    const tx = await contract.getWinner(electionId);
    const receipt = await tx.wait();
    return receipt;
  }catch(err){
    console.log(err)
  }
}

const booth = async() => {
  const contract = voteContract();
  try{
    const tx = await contract.booth();
    const receipt = await tx.wait();
    return receipt;
  }catch(err){
    console.log(err)
  }
}

const myElections = async() => {
  const contract = voteContract();
  try{
    const tx = await contract.myElections();
    const receipt = await tx.wait();
    return receipt;
  }catch(err){
    console.log(err)
  }
}



const pauseContract = async() => {
  const contract = voteContract();
  
 try {
   const  result =await contract.pause();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const unPauseContract = async() => {
  const contract = voteContract();
  
 try {
   const  result =await contract.unpause();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

export const ConnectProvider = ({ children }) =>{
    const [currentAccount, setCurrentAccount] = useState("");

    const connectWallet = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            alert("Get MetaMask -> https://metamask.io/");
            return;
          }
                
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          
          console.log("Connected", accounts[0]);
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error)
        }
      }
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          console.log('Make sure you have metamask!');
          return;
        } else {
          console.log('We have the ethereum object', ethereum);
        }
    
        // Check if we're authorized to access the user's wallet
        const accounts = await ethereum.request({ method: 'eth_accounts' });
    
        // Users can have multiple authorized accounts, we grab the first one if its there!
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      };


      useEffect(() => {
        checkIfWalletIsConnected();
      }, [])
    
  
    

    
    return (
      <ConnectContext.Provider
        value={{
          
          pauseContract,
          unPauseContract,
          vote,
          connectWallet,
          currentAccount,
          createElection,
          startElection,
          getWinner,
          myElections,
          booth
        }}
      >
        {children}
      </ConnectContext.Provider>
    );
  };