
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

import { IoMdArrowDropdown } from 'react-icons/io';

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ user, setUser ] = useState('');
  let [ roles, setRoles ] = useState([]);
  
  const logOut = async () => {
    try{
      const data = await fetch ("https://backend.insjoaquimmir.cat/api/logout",{
        headers:{
          Accept: "application/json",
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + authToken
        },
        method: "POST",
      });
      const resposta = await data.json();
        if (resposta.success === true){
          setAuthToken("");          
        }
    }
    catch{
      console.log(data);
    }
  }

  const obtUser = async () => {
    try{
      const data = await fetch ("https://backend.insjoaquimmir.cat/api/user",{
        headers:{
          Accept: "application/json",
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + authToken
        },
        method: "GET",
      });
      const resposta = await data.json();
        if (resposta.success === true){
          console.log(resposta);
          setUser(resposta.user.name);
          setRoles(resposta.roles);
        }
    }
    catch{
      console.log("d");
      alert("Catchch");
    }
  } 

 useEffect(() => {
   obtUser();
 }, [])

  return (
    <>
    <header className="header">  
      <h3 className="title">GeoReact</h3>      
      <nav>
        <Link to="/posts" className="Link">Posts</Link>
        <Link to="/places" className="Link">Places</Link>
        <Link to="/about" className="Link">About</Link>                 
      </nav>     
        
      <button className="navbar-toggler botoncito" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
        {user} <IoMdArrowDropdown />
      </button>      
      
      <p>{roles.map (  (v)=> ( <span key={v}> {v} </span>) ) }</p>
      <a className="logout"
        onClick={(e) => {
          logOut(e);
        }}>Logout </a> 
                             
    </header>      
    </>
  )} 