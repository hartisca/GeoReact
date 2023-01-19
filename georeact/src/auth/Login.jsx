import React from 'react'
import { useState } from 'react'

export const Login = () => {    
    let [register, setRegister] = useState(true);
  return (
    <>
        <form>
            <h2>Login: </h2>
            <label>
            Name:
            <input type="text" name="name" />        
            <input type="submit" value="Submit" />  
            <br></br>      
            Password:
            <input type="password" name="password" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        <button
        onClick={() => {
          setRegister(false);
        }}
      > Are you not registered yet? </button>
    </>
  )
}
