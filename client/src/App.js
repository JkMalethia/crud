import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import './App.css';

function App() {

  const [foodName, setFoodName] = useState('')
  const [foodList, setFoodList] = useState([])



  useEffect(() => {
    Axios.get('http://localhost:3001/read')
      .then((response) => {
        setFoodList(response.data)
      })
  })

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', { foodName: foodName })
    document.getElementById('input').value = ''
  }
  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }

  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <h6>Your SuperApp Here...</h6>
      <div>
        <input id='input' className="input" type="text" placeholder="Hello CRUD..." onChange={(event) => {
          setFoodName(event.target.value)
        }} />
        <span className="btn" onClick={addToList}>ADD</span>
      </div>
      <h2>Food List</h2>
      <span>{foodList.map((val, key) => {
        return (<div className='foodBox'>
          <h4>{val.foodName}</h4>
          <button onClick={() => deleteFood(val._id)}>Delete</button>
        </div>)
      })}</span>
    </div>
  );
}

export default App;
