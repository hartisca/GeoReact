import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';

import { PlaceGrid } from './PlaceGrid';


export function PlacesGrid () {
  let [ places, setPlaces] = useState([]);
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
 


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

