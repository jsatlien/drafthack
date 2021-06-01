/* eslint-disable react/prefer-stateless-function */
import React, { useState } from "react";
import FileUpload from '../../components/FileUpload';

function Upload({socket}) {
  const [playerPool, setPlayerPool] = useState([]); 

  const updatePlayers = async () => {
    //pull latest picked from draft lobby
  }

  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
        </p>   
        <FileUpload/>
    </div>
  );
}

export default Upload;
