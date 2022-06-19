import { useState, useContext } from "react";
import "../styles/navbar.css";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { VscChromeClose } from "react-icons/vsc";
import { ConnectContext } from "../context/ConnectContext";

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const {currentAccount } = useContext(ConnectContext);
  const [navbarState, setNavbarState] = useState(false);
  return (
    <nav className="navigation">
      <div>
      <Link to="/" className="brand-name">
      <img src={logo} alt="" />
            PlebSite
      </Link>

      {isNavExpanded ? (
             <span className="close" onClick={() => setIsNavExpanded(!isNavExpanded)}>X</span>
            ) : (
              <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
            )}
      </div>
      <div><button className="address">{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</button></div>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
       <div> <ul>
        
          <li>
          <Link to="/CreateElection">Create Election</Link>
          </li>
          <li>
         <Link to="/Election-Booth">Booth</Link>
          </li>
          <li>
         <Link to="/MyElection">My Election</Link>
          </li>
          
        </ul>
        </div>
      </div>
    </nav>
  );
}
