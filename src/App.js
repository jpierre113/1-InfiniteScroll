import './App.css';
import data from './nyc_ttp_pins.json'
import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const perPage = 5;
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
      <h1>Kittintrest</h1>
      <CardColumns>
        {
          pinsList.list.map((pin, index) => {
            return (
              <Card key={index} style={{ width: '30rem' }}>
                <Card.Body>
                  <Card.Img src={pin.images["474x"].url}/>
                  <Card.Text> {pin.description} </Card.Text>
                </Card.Body>
              </Card>
            )
          })
        }
        <div className="loading" ref={loader}></div>
      </CardColumns>
    </div>
  );
}

export default App;