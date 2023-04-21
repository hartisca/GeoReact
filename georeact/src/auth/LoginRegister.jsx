import React from 'react'
import Login  from './Login'
import Register   from './Register'
import { useState, useContext } from 'react'
import { UserContext } from '../userContext'



export default function App() {
  //Declarem variable d'estat
  let [register, setRegister] = useState (true);
  
  
  return (
    <div className="App">

      {register ? <Login setRegister={setRegister} /> : <Register setRegister={setRegister} />}
      
    </div>    
  )  
}

