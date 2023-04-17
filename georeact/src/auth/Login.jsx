import React, { useContext } from 'react'
import '../styles/loginRegister.css'
//import { useForm } from '../hooks/useForm'
import useLogin from '../hooks/useLogin'
import { useForm } from "react-hook-form";
import { UserContext } from '../userContext';


export default function Login({setRegister}) {     
  
  let { authToken, setAuthToken } = useContext(UserContext);
  
  /*
  const { formState, onInputChange, resetForm } = useForm({
    email: "",    
    password: "",    
  });
  const {email,password} = formState */

  const { register, handleSubmit } = useForm();
  const { doLogin, error, setError} = useLogin()
  const onSubmit = data => doLogin(data.email, data.password);

  //let {doLogin} = useLogin();

  return (
    <>
        <h2>Login: </h2>
        <form className='form'>
            <div className='form-body'>              
                <label> Email: </label>
                <input type="email" {...register("email")}
                  //name="email" 
                  //onChange={onInputChange}
                />   
                         
                <br></br>      
                <label>Password: </label>
                <input type="password" {...register("password")}
                  //name="password" 
                  //onChange={onInputChange}
                />                              
            </div>
            <div className='errores' hidden></div>  
            <div className="footer">
              <button onClick ={ handleSubmit(onSubmit)}> Fes Login </button>  
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
