import './App.css';
import data from './nyc_ttp_pins.json'
import React, { useState } from 'react';

function App() {
  const [pinsData, setPins] = useState([...data]);
  return (
    <div className="App">
      <h1>Pinterest</h1>
      {pinsData.map((pin, index) => {
        return(
         <p>{pin.board.id}</p>
        )   
    })
  }
    </div>
  );
}

export default App;
