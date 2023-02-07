import React from 'react'
import { Link } from 'react-router-dom'

export const PlacesMenu = () => {
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
export default PlacesMenu