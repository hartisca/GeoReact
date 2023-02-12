import { useContext, useState} from 'react'
import { React } from 'react';
import { UserContext } from '../userContext'
import { Link } from 'react-router-dom'

export function PlaceGrid  (place)  {
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)

  return (
    <>
        <div className="grid-place">
            <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.name} height="450"width="450"/>
            <h1>{place.name}</h1>
            <p>Author: {place.author.name}</p>
            <p>Description: {place.description}</p>
            <p>Latitude: {place.latitude}</p>
            <p>Longitude: {place.longitude}</p>
            <p>Favorites: {place.favorites_count} <i className="bi bi-star-fill"></i></p>
            <p>Este place tiene {place.reviews_count} reseñas.</p>
            <div>
                <Link to={"/places/" +place.id}> <i className="bi bi-eye-fill"></i></Link>

            
            </div>
        </div>

    </>
  )
}