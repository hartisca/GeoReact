


import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceList from './PlaceList';



export const PlacesList = () => {

  let { authToken, setAuthToken } = useContext(UserContext);
  let [places, setPlaces] = useState([]);

  const getPlaces = async (e) =>{
      try{
          
          const data = await fetch ('https://backend.insjoaquimmir.cat/api/places',{
              headers: {
                  "Accept": "application/json",
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
          console.log('Error');
      }
  }

  useEffect(() => { 
      console.log("PlacesList.jsx useEffect()");
      getPlaces();
   }, []);

  return (
      <table className='placesTable'>
          <tbody>
              <tr>
                  <th>Id</th>
                  <th>Author</th>
                  <th>Name</th>
                  <th>Description</th>                    
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Visibility</th>
              </tr>
              { places.map ( (place)=> (
                         
                  (<tr key={places.id}>
                      <PlaceList place={place} /></tr>)
                  ))}
          </tbody>
      </table>
  )


}
