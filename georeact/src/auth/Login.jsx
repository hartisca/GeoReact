import React, { useContext } from 'react'
import '../styles/loginRegister.css'
import { UserContext } from '../userContext'
import { useForm } from '../hooks/useForm'
import useLogin from '../hooks/useLogin'


export default function Login({setRegister}) {       
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext)

  const { formState, onInputChange, resetForm } = useForm({
    email: "",    
    password: "",    
  });
  const {email,password} = formState
  
  let {doLogin, checkAuthToken} = useLogin();
  checkAuthToken();

  return (
    <>
        <h2>Login: </h2>
        <form className='form'>
            <div className='form-body'>              
                <label> Email: </label>
                <input type="email" name="email" onChange={onInputChange}/>   
                         
                <br></br>      
                <label>Password: </label>
                <input type="password" name="password" onChange={onInputChange}/>                              
            </div>
            <div className='errores' hidden></div>  
            <div className="footer">
              <button
                onClick={(e) => {
                  doLogin(e, email, password);
                }}>
                Fes Login
              </button>   
              <button
                onClick={(e) => {
                  resetForm(e);
                }}>
                Buida                
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
