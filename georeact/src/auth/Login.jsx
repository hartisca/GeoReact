import React, { useContext } from 'react'
import '../styles/loginRegister.css'
import { useState } from 'react'
import { UserContext } from '../userContext';


export default function Login({setRegister}) {   
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext)

  const sendLogin = async(e) => {
    try{
      e.preventDefault();

        console.log("Comprovant credencials....");
        // Enviam dades a l'aPI i recollim resultat
        const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ email: email, password: password })
        });
        
        const resposta = await data.json();
          if(resposta.success === true){
            setAuthToken(resposta.authToken);
            setUserEmail(email);
          }else{
              const errores = document.getElementsByClassName("errores")[0];
              errores.innerHTML = resposta.message;
              errores.removeAttribute('hidden');           
            }}
    catch (error){
      console.error(error)
      console.log('Error');
    }
  };
  return (
    <>
        <h2>Login: </h2>
        <form className='form'>
            <div className='form-body'>              
                <label> Email: </label>
                <input type="email" name="email" onChange={(e) => {
                  setEmail(e.target.value);}}/>   
                         
                <br></br>      
                <label>Password: </label>
                <input type="password" name="password" onChange={(e) => {
                  setPassword(e.target.value);}}/>                              
            </div>
            <div className='errores' hidden></div>  
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
