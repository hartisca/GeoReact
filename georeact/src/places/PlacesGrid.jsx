import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';

import { PlaceGrid } from './PlaceGrid';

/** This component displays the visualitzation of the place's grid.
 * @component
 * @function
 * @returns {jsx} 
 */
export function PlacesGrid () {
  
  let [ places, setPlaces] = useState([]);
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
 

/**
 * This asyncron function gets the object place from the API via the GET method
 * @function
 * @async
 * @param {Event} e - The event that triggers the function call.  
 * @returns {Promise}
 */



  const getPlaces = async (e) => {
      try {
  
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer '  + authToken,
  
          },
          method: "GET",
      })
        const resposta = await data.json();
        console.log(resposta);
        if (resposta.success == true )
        {
          setPlaces(resposta.data);
          setAuthToken(authToken);  
          console.log(places); 

         
        }else{
          console.log("La resposta no ha triomfat");
  
        }            
        
      } catch {
        console.log("Error");
        console.log("catch");
      }
    };


    useEffect(()=>{
      getPlaces();
  }, [])

return (
  <>
  <div>PlacesGrid</div>
  <div className="container-grid">

      {places.map((place) => (
        (place.visibility.name == 'public' || usuari == place.author.email) &&  
        (<tr  key={place.id}><PlaceGrid place={place} /></tr>)
      ))}

  </div>
</>
)
}

