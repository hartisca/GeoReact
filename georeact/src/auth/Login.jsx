import React from 'react'
import '../styles/loginRegister.css'
export default function Login({setRegister}) {    
  return (
    <>
        <h2>Login: </h2>
        <form className='form'>
          <div className='form-body'>              
              <label> Name: </label>
              <input type="text" name="name" />              
              <br></br>      
              <label>Password: </label>
              <input type="password" name="password" />
                            
            </div>
            <div class="footer">
              <button type="submit" class="btn">Log in</button>
          </div>
        </form>
        <a className ="registerButton"
        onClick={() => {
          setRegister(false);
        }}
      > Are you not registered yet? </a>
    </>
  )
}
