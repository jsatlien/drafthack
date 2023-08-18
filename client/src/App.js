/* eslint-disable react/prefer-stateless-function */
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import socketClient from 'socket.io-client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DraftDashboard from './pages/DraftDashboard';
import Upload from './pages/Upload';
import Home from './pages/Home';
import MainNav from "./components/Navbar";

function App() {

  return (
    <BrowserRouter>
      <MainNav title='DraftHack'></MainNav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/dashboard' component={() => <DraftDashboard />} />
        <Route exact path='/upload' component={Upload} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
