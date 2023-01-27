import React from 'react';
import '../styles/loginRegister.css'
import { useState, useContext } from 'react'
import { UserContext } from '../userContext';


export default function Register({setRegister}) {
    let [formulari, setFormulari] = useState({});
    let { authToken, setAuthToken } = useContext(UserContext)

    const handleChange = (e) => {
        e.preventDefault();

        setFormulari({
        ...formulari,
        [e.target.name]: e.target.value
        });
    };
    const handleRegister = (e) => {
        e.preventDefault();

        let { name, password, password2, email } = formulari;
        alert(
        "He enviat les Dades:  " +
            name +
            "/" +
            email +
            "/" +
            password +
            "/" +
            password2
        );
        if (password2 !== password) {
            alert("Els passwords han de coincidir");
            return false;
        }
        fetch("https://backend.insjoaquimmir.cat/api/register", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        // Si els noms i les variables coincideix, podem simplificar
        body: JSON.stringify({ name, email, password })
        })
        .then((data) => data.json())
        .then((resposta) => {
            console.log(resposta);
            if (resposta.success === true) {
                alert(resposta.authToken);
                setAuthToken(resposta.authToken); 
            } else{
                const errores = document.getElementsByClassName("errores")[0];
                errores.innerHTML = resposta.message;
                errores.removeAttribute("hidden");
            }
        })       

        alert("He enviat les Dades:  " + email + "/" + password);
    };
    
  return (
      <>
      <h2>Register: </h2>
        <div className='form'>
            <form className='form-body'>
            Name:
            <input className="name" name="name" type="text" onChange={handleChange} />
            <br />
            E-mail
            <input className="mail" name="email" type="email" onChange={handleChange} />
            <br />
            Password:
            <input className="pswd" name="password" type="password" onChange={handleChange} />
            <br />
            Confirm Password:
            <input className="pswd" name="password2" type="password" onChange={handleChange} />
            <br />
            <div className='errores' hidden></div>  

            <button className="btn3"
                onClick={(e) => {
                handleRegister(e);
                }}
            >
                Register
            </button>
            </form>
        </div>
        <a className ="registerButton"
        onClick={() => {
            setRegister(true);
        }}> Already registered? </a>     
    </>
)};