import React from 'react'
import '../styles/loginRegister.css'
import { useState } from 'react'
export default function Login({setRegister}) {   
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");

  const sendLogin = (e) => {
    e.preventDefault();

    alert("He enviat les Dades:  " + name + "/" + password);
  };
  return (
    <>
        <h2>Login: </h2>
        <form className='form'>
            <div className='form-body'>              
                <label> Name: </label>
                <input type="text" name="name" onChange={(e) => {
                  setName(e.target.value);}}/>              
                <br></br>      
                <label>Password: </label>
                <input type="password" name="password" onChange={(e) => {
                  setPassword(e.target.value);}}/>
                              
            </div>
            <div className="footer">
              <button
                onClick={(e) => {
                  sendLogin(e);
                }}>
                Fes Login
              </button>            
            </div>
        </form>
        
      <a className ="login1"
        onClick={() => {
          setRegister(false);
        }}
      > Are you not registered?</a>
      
    </>
  )
}
