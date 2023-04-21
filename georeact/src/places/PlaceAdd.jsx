import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";


/**
 * This is a function for adding a new place object.
 * @function
 * @component
 */

export function PlaceAdd () {


/**
 * Declares the state variable using the hooks  useParams, useState, useContext and useNavigate.
 * @type {const} 
 * @type {variable}
 * @property {object} formulari
 * @property {object} authoken
 * @property {object} error
 * @property {variable} navigate
*/
  let [formulari, setFormulari] = useState({});
  let { authToken,setAuthToken } = useContext(UserContext);
  let [error, setError] = useState("");


  let navigate = useNavigate();

/**
   * A function that updates the form state variable
   * when a form field is changed.
   * @function
   * @param {Object} e - The event object
   */

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name==="upload")
      {
        console.log(e.target.files[0].name)
        setFormulari({
          ...formulari,
          [e.target.name] : e.target.files[0] 

        })
      }
    else {
          setFormulari({
            ...formulari,
            [e.target.name] : e.target.value

          })
      }
  }

  /**
   * A function that sends a POST request to the backend API
   * to add a new place.
   * @function
   * @requires authoken as authoritzation, its previously given by the state variable previously delared.
   * @param {Object} e - The event object
   */
    const addPlace = async(e) => {
      e.preventDefault();
      let {name,description,upload,latitude,longitude,visibility=1}=formulari;
      console.log(formulari);
   

      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
          },
          method: "POST",
          body: formData

        })
        const resposta = await data.json();
        if (resposta.success === true){
          console.log(resposta);
          alert("Place creado correctamente");
          setFormulari(resposta)
          navigate("/places/")
        } 

        else{
          console.log(formulari)
          setError(resposta.message);
        } 
          
      }catch{
        console.log("Error");
        alert("catch");
      }
      
    }

    /**
   * This hook runs after the component has mounted (only once), and after getting the user's coordenades from the method "getCurrentPosition"
   * sets the latitude and longitude fields of form.
   * @function
   */
    useEffect(() => {
      addPlace();
      navigator.geolocation.getCurrentPosition( (pos )=> {

        setFormulari({
    
          ...formulari,
          latitude :  pos.coords.latitude,
          longitude: pos.coords.longitude
      
        })
        
        console.log("Latitude is :", pos.coords.latitude);
        console.log("Longitude is :", pos.coords.longitude);
      });

    }, [])

  // Render the component
  
  return (
    <div>
        <div>
          <form id="formulari">
            <div><h1>Add Place</h1></div>

            <div>
              <label>Name: </label>
              <input type="text" placeholder="Name" id="name" name="name" onChange={handleChange}/>
            </div>

            <div>
              <label>Description: </label>
              <input type="text" placeholder="Description" id="description" name="description" onChange={handleChange}/>
            </div>

            <div>
            <label>Latitude: </label>
              <input type="number" placeholder="Latitude" id="latitude" name="latitude" value = { formulari.latitude } onChange={handleChange}/>
            </div>

            <div>
            <label>Longitude: </label>
              <input type="number"placeholder="Longitude" id="longitude" name="longitude" value = { formulari.longitude } onChange={handleChange}/>
            </div>

            <div>
              <label>Visibility: </label>
              <select value= {formulari.visibility } onChange={handleChange} id="visibility" name="visibility"  >
                <option  value="1" selected >Public</option>
                <option  value="3" >Private</option>
                <option  value="2" >Contacts</option>
              </select>
            </div>

            <div>
              <label>File: </label>
              <input type="file" placeholder="Upload" id="upload" name="upload" onChange={handleChange}/>
            </div>
            <div>{ error ? (<div className="mensaje-error"> {error}</div>) : (<></>)}</div>
            <button
              onClick={(e) => {
                addPlace(e);
              }}>
              Submit
            </button>		

          </form>
        </div>		
    </div>
  )
}