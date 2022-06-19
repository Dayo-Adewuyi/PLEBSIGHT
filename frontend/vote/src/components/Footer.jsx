import React from "react";
import styled from "styled-components";

import { FaGithub } from "react-icons/fa";
export default function Footer() {
  return (
    <FooterContainer>
      <span>Copyright &copy; 2021 Hamid. All rights reserved</span>
      <div className="footer-container">
					<FaGithub className="twitter-logo" />
					<a
						className="footer-text"
						href= "https://github.com/Dayo-Adewuyi"
						target="_blank"
						rel="noreferrer"
					>{`built by Hamid`}</a>
				</div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-evenly;
  background-color: #d0d8ff;
  border-radius: 0.5rem;
  padding: 2.5rem;
  
  ul {
    display: flex;
    list-style-type: none;
    gap: 2rem;
    li {
      a {
        text-decoration: none;
        color: black;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
      svg {
        font-size: 1.3rem;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #302ce9;
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    ul {
      flex-direction: column;
    }
    .social__links {
      flex-direction: row;
    }
  }
`;
