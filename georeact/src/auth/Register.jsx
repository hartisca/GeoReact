import React from 'react';
import '../styles/loginRegister.css'
import { useState } from 'react'


export default function Register({setRegister}) {
    let [formulari, setFormulari] = useState({});

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
    </>)}