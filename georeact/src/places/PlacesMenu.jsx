import React from 'react'
import { Link } from 'react-router-dom'


/**
 * This component provides the menu component.
 * @component
 * @returns {jsx} the representation of the menu component that includes the links to another components.
 */
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
  

 
