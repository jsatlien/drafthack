/* eslint-disable react/prefer-stateless-function */
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketClient from 'socket.io-client';

function App() {
  const [playerPool, setPlayerPool] = useState([]); 
  const socket = socketClient('/');

  socket.on('PICK_PLAYER', () => {
    console.log("player picked!")
  })

  const updatePlayers = async () => {
    //pull latest picked from draft lobby
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
  );
}

export default App;
