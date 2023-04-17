import React from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { UserContext } from '../userContext';

import { useForm } from '../hooks/useForm';
import { setFilter } from '../slices/posts/postSlice';


function PostsMenu() {
  let {usuari, setUsuari} = useContext(UserContext)

    const dispatch = useDispatch()
    const { formState, onInputChange } = useForm({
        search: "",
    });
    const {search} = formState

    const {filter} = useSelector((state) => state.post)

   
  return (
      <>
    <Navbar className='postsMenu justify-content-end'>
        <Link to="/posts/add" className=''>Add Post </Link>
        <Link to="/posts/grid" className=''>Grid </Link>        
        <Link to="/posts/list" className=''>List</Link>
    </Navbar>  
    <Navbar.Collapse className="justify-content-end">
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} name="search" onChange={onInputChange}/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => {e.preventDefault();dispatch(setFilter({...filter,body:formState.search}))}}>&#128270;</button> 
        <button className="btn5 btn-light my-2 my-sm-0"  type="submit" onClick={(e) => {e.preventDefault();dispatch(setFilter({...filter,author:idUser}))}}>Els meus Posts</button>
        <button className="btn6 btn-light my-2 my-sm-0" type="submit" onClick={(e) => {e.preventDefault();dispatch(setFilter({...filter,author:"",body:""}))}}>Restaura Filtres</button>       
        </form>
        
    </Navbar.Collapse>  
    </>
  )
}

export default PostsMenu