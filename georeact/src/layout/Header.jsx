import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ user, setUser ] = useState('');
  
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
    <h3 className="title">GeoReact</h3>
    <header>      
      <nav>
        <Link to="/posts" className="Link">Posts</Link>
        <Link to="/places" className="Link">Places</Link>
        <Link to="/about" className="Link">About</Link>                 
      </nav>
      <p>{user}</p>
      <a className="logout"
        onClick={(e) => {
          logOut(e);
        }}>Logout </a>          
    </header>
      
    </>
  )}
