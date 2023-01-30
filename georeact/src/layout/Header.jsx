import { useContext } from "react";
import { Link } from "react-router-dom";


import { UserContext } from "../userContext";

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);

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
      alert("Catchch");
    }
  }
  return (
    <>
      <div className="header">        
        <Link to="/about">About </Link>             
      </div>
      <div className="logoutbox">
      <a className="logout"
        onClick={(e) => {
          logOut(e);
        }}>
        Logout
      </a> 
      </div>  
      
    </>
  );
}