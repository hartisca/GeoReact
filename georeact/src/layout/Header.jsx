import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/posts">Posts</Nav.Link>
            <Nav.Link to="/places">Places</Nav.Link>
            <Nav.Link to="/about">About</Nav.Link>

            <NavDropdown title={user} id="basic-nav-dropdown">
              <NavDropdown.Item><a className="logout"
            onClick={(e) => {
              logOut(e);
            }}>
            Logout
          </a> </NavDropdown.Item>  
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  </>
  )}
