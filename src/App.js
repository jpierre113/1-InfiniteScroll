import './App.css';
import data from './nyc_ttp_pins.json'
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const perPage = 10;
  const [pinsData, setPins] = useState([...data]);
  const [pinsList, setPinsList] = useState({
      list: pinsData.slice(0, perPage)
    });
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    let options = {
    root: null,
    rootMargin: "20px",
    threshold: 1.0
    };

  const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current){
      observer.observe(loader.current)
    }
  }, []);

  useEffect(() => {
    const newList = pinsList.list.concat(pinsData.slice(page * perPage, (page + 1) * perPage));
    setPinsList({
      list: newList
    })
  }, [page])

    

  const handleObserver = (entities) => {
    const target = entities[0];
      if (target.isIntersecting) {
        setPage((page) => page + 1)
      }
  }
  
  return (
    <div className="App">
      <h1>Pinterest</h1>
      <div className="post-list">{
        pinsList.list.map((pin, index) => {
          return (<div key={index} className="pins">
            <img src={pin.images["236x"].url}/>
            <h2> {pin.board.id} </h2>
          </div>)
        })
      }
        <div className="loading" ref={loader}></div>
      </div>
    </div>
  );
}

export default App;
