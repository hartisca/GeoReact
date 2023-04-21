import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { Link } from 'react-router-dom';

/**
 * Declares the atributes of the object Place and the state variables.
 * @funcion
 * @component
 */
export function Place () {

  let { id } = useParams();
  let {usuari,setUsuari,authToken,setAuthToken } = useContext(UserContext)
  let {isLoading, setIsLoading} = useState(true);
  let [place, setPlaces] = useState({
    author:{name:""},
    name:"",
    description:"",
    latitude:"",
    longitude:"",
    favorites_count:"",
    reviews_count:"",
    file:{filepath:""}
  });
/**
 * This function provides the Place object to components that requires it,
 * 
 * @function
 * @returns {object} Place
 */
//
  const getPlace = async () => {
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authToken
        },
        method: "GET",
      })

      const resposta = await data.json();
      console.log(resposta);
      if (resposta.success === true) {
        setPlaces(resposta.data);
        console.log(resposta);
        console.log('s ha convertit a json la resposta');
        setIsLoading(false);      }
      else{
        console.log("La resposta no ha triomfat");
        alert(resposta.message);
      }

    }catch {
      console.log("Error");
      alert("catch")
    }
  }
 

  useEffect(() => { getPlace();}, []);
  return (
    <>{(isLoading == true) ? <div>Carregant dades...</div> :
    <div>
      <img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} alt={place.id} height="450"width="450"/>
      <h1>{place.name}</h1>
      <p>Author: {place.author.name}</p>
      <p>Description: {place.description}</p>
      <p>Latitude: {place.latitude}</p>
      <p>Longitude: {place.longitude}</p>
      <p>Favorites: {place.favorites_count} <i className="bi bi-star-fill"></i></p>
      <p>Este place tiene {place.reviews_count} reseñas.</p>

      <div>

        {(usuari == place.author.email ) &&  
        <Link to={"/places/edit/" +place.id}><i className="bi bi-pencil-fill"></i></Link>}

        {(usuari == place.author.email ) &&
           <i className="bi bi-trash3-fill"></i> }
  
      </div>

    </div>}
</>
  )
}