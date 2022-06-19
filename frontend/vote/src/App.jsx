import React from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import CreateElection from "./Pages/CreateElection";
import ElectionBooth from "./Pages/ElectionBooth";
import MyElection from "./Pages/MyElection";



export default function App() {
  
  return (
    <Router>
     
      
        <Routes>
         
          <Route exact path="/" element={<Home />}></Route>
         
          <Route exact path="/CreateElection" element={<CreateElection />}></Route>
          <Route
            exact
            path="/Election-Booth"
            element={<ElectionBooth />}
          ></Route>
          <Route
            exact
            path="/MyElection"
            element={<MyElection />}
          ></Route>
        
        </Routes>
     
    </Router>
  );
  
}
