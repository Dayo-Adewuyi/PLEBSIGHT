import React from "react";
import {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import avatarImage from "../assets/avatarImage.jpeg";
import { ConnectContext } from "../context/ConnectContext";
import { ToastContainer, toast } from 'react-toastify';


export default function Testimonials() {
  const { currentAccount, vote, booth } = useContext(ConnectContext);
  const [election, setelection] = useState([])

  const voteCandidate = async() => {
    // // const result = await vote(candidate.candidateId, election.electionId);
    // console.log(result);
  }
  const fetchElection = async() => {

    const result = await booth();
    setelection(result);
  }
  
  useEffect(() => {fetchElection()}, [])

  return (
    <Section id="testimonials">
      <div className="title">
        <h2>ELECTION BOOTH</h2>
      </div>
      
      <div className="testimonials">
        <div className="testimonial">
          {election.map((element, index) => {
            if (element.active){
              return (
                <div key={index}>
                  <h3>{element.details}</h3>
                  {element.candidates.map((candidate, index) => { 
                  
                  return (<div className="election"><img src={`https://ipfs.infura.io/ipfs/${candidate.photoHash}`} width="70px" height="70px"/><br></br><p key={index}>{candidate.name}</p> 
                 
                  <button onClick={() => vote( (candidate.candidateId).toNumber(), (element.electionId).toNumber())}>VOTE</button></div>)
                  })}
                 
                </div>
              )
            }  else{
              return (<></>)
          }
          })}
          {election.electionId}
          <p> {election.details}</p>
          <div className="info">
            {election.candidates?.map((candidate, index) => {
               return( <div key={index}>
                  <img alt="avatar" />
                  <p> {candidate.candidateId}</p>
                  <p>{candidate.name}</p>
                  <span>{candidate.vote}</span>
                  <button onClick={voteCandidate}>vote</button>
                </div>)
})
                          }
           
          </div>
        </div>
        
        <ToastContainer />
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .testimonials {
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color: aliceblue;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      .election{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 2rem;
        gap: 2rem;
        padding: 2rem;
      }
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        img {
          border-radius: 3rem;
          height: 3rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
