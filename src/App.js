import './App.css';
import data from './nyc_ttp_pins.json'

function App() {
  const pinsData = [...data]
  return (
    <div className="App">
      <h1>Test</h1>
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
