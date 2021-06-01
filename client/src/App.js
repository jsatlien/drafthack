/* eslint-disable react/prefer-stateless-function */
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketClient from 'socket.io-client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DraftDashboard from './pages/DraftDashboard';
import Upload from './pages/Upload';

function App () {
  const socket = socketClient('/');
  socket.on('PICK_PLAYER', () => {
    console.log("player picked!");
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={() => <DraftDashboard socket={socket}/>}/>
        <Route exact path='/upload' component={Upload}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
