import './App.css'
import { Login } from './auth/Login'
import Register  from './auth/Register'
import { useState } from 'react'

function App() { 
  
    //Declarem variable d'estat
    let [register, setRegister] = useState (true);
  
    return (
      <div className="Login">

        {register ? <Login /> : <Register />}
        
      </div>    
    );
}

export default App
