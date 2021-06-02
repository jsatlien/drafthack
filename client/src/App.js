/* eslint-disable react/prefer-stateless-function */
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import socketClient from 'socket.io-client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DraftDashboard from './pages/DraftDashboard';
import Upload from './pages/Upload';

function App () {
  // const socket = socketClient('/');
  // const [socketMsg, setSocketMsg] = useState({});
  // useEffect(() => {
  //   //TODO configure rooms per user (deployed version)
  // //   const socket = socketClient("/");
    
  // //   socket.on('PICK_PLAYER', (msg) => {
  // //     console.log("player picked!");
  // //     // console.log(msg);
  // //     setSocketMsg({
  // //       type: 'PICK_PLAYER',
  // //       ...msg
  // //     })
  // //   }, []);

  // //   socket.on('DRAFT_LOBBY_OPEN', (msg) => {
  // //       console.log("Lobby open!");
  // //       // console.log(msg);
  // //       setSocketMsg({
  // //         type: 'DRAFT_LOBBY_OPEN',
  // //         ...msg
  // //       })
  // //   });

  // //   return () => socket.disconnect();

  // // }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={() => <DraftDashboard />}/>
        <Route exact path='/upload' component={Upload}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
