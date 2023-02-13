


import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import { PlaceList } from './PlaceList';
import { Place } from './Place';


export function PlacesList() {

  let { authToken, setAuthToken,usuari, setUsuari } = useContext(UserContext);
  let [places, setPlaces] = useState([]);
  let [refresh,setRefresh] = useState(false)

  const getPlaces = async (e) =>{
      try{
          
          const data = await fetch ('https://backend.insjoaquimmir.cat/api/places',{
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer '  + authToken,
                },
                method: "GET"
          })
          const resposta = await data.json();
          if (resposta.success === true){
              setPlaces(resposta.data);
              console.log(resposta);
          } else{
              alert('Error en la resposta!')
          }
      } catch{
          console.log('Error (CATCH)');
      }
  }


  const deletePlace = async (e,id) =>{
    e.preventDefault();
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authToken
        },
        method: "DELETE",
    })

      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success === true) {
        setRefresh(!refresh);
        alert("Place eliminat correctament");
        console.log("Place eliminat correctament");
      }
      else{
        alert("El place no s ha pogut eliminar");
        console.log(resposta.message);
      }

    }catch {
      console.log(data);
      console.log("catch");
    }
  }




  useEffect(() => { 
      getPlaces();
   }, [refresh]);

  return (
      <table className='placesTable'>
         <tbody>
              <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Reviews</th>                    
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Visibility</th>
                 
              </tr>
            
              { places.map ( (place)=> (
                  ( place.visibility.name != 'private' || usuari.email == place.author.email) &&       
                  (<tr key={place.id}>
                      <PlaceList place={place} deletePlace={deletePlace} /></tr>)
                  ))}
          </tbody>
      </table>
  )


}

