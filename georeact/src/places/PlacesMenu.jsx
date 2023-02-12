import React from 'react'
import { Link } from 'react-router-dom'
//import './PlacesMenu.css'; 
 export function PlacesMenu()  {
  return (
    <>
    
    <div className='placesMenu'>
        <Link to="/places/add" className=''>Add Place </Link>
        <Link to="/places/grid" className=''>Grid </Link>        
        <Link to="/places/list" className=''>List</Link>
    </div>
    </>
  )
}
  

 