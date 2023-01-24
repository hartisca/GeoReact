import './App.css'
import LoginRegister from './auth/LoginRegister';
import { UserContext } from "./userContext";
import { useState } from 'react'


function App() {   

  let [authToken, setAuthToken] = useState("");
  
  return (
    <>
    <UserContext.Provider value={{ authToken, setAuthToken }}  >
        <LoginRegister />
    </UserContext.Provider>
    </>
  )
}

export default App
