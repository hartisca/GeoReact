import React from 'react'
import { useState } from 'react';

import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import { useParams } from "react-router-dom";

export function PlaceEdit() {
  const {id} = useParams();
  let [ formulari, setFormulari ] = useState({});
  let { authToken,setAuthToken } = useContext(UserContext);
  let [place, setPlace] = useState({});
  
  const handleChange = (e) => {
    e.prventDefault();
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
    };
  }

  const getPlaces = async (e) =>{
    try{        
      const data = await fetch ('https://backend.insjoaquimmir.cat/api/places/' +id,{
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + authToken,
            },
            method: "GET"
      })
      const resposta = await data.json();
      if (resposta.success === true){
          setPlace(resposta.data);
          console.log(resposta);
      } else{
          alert('Error en la resposta!')
      }
    }catch{
      console.log('Error');
    }
}

  useEffect(() => { 
    getPlaces();
    updatePlace();
      navigator.geolocation.getCurrentPosition( (pos )=> {

        setFormulari({
    
          ...formulari,
          latitude :  pos.coords.latitude,
          longitude: pos.coords.longitude
      
        })
        
        console.log("Latitude is :", pos.coords.latitude);
        console.log("Longitude is :", pos.coords.longitude);
      });
  }, []);

  const updatePlace = async(e) => {
    e.preventDefault();

    let { name, description, upload ,latitude , longitude, visibility=1 }  = formulari;
    console.log(formulari);
    const formdata = new FormData();        
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("upload", upload);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);
    formdata.append('visibility', visibility);
    console.log(formulari)

    try{
      const data = await fetch('https://backend.insjoaquimmir.cat/api/places/' +id, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formdata
      })
      const resposta = await data.json();
      if (resposta.success === true){
        console.log(resposta);
        setFormulari({})
        alert ('Place successfully uploaded');
      } else{
        alert('There was an error uploading the place');
        console.log(resposta);            
      }
    }catch{
      console.log('Error')
    }
  }
  return (
    <>
      <div className="containerAdd">
        <form id="formAddPlace"className="addPlace">
              <div className="title"><h3>Update your Place</h3></div>
              <div>
              <label>Name: </label>
              <input type="text"placeholder="Name" id="name" name="name" value = { formulari.name } onChange={handleChange}/>
            </div>

            <div>
              <label>Description: </label>
              <input type="text" placeholder="Description" id="description" name="description" value = { formulari.description } onChange={handleChange}/>
            </div>

              <div>
                <input type="number" placeholder="Latitude" id="latitude" name="latitude" value = { formulari.latitude } onChange={handleChange}/>
              </div>

              <div>
                <input type="number"placeholder="Longitude" id="longitude" name="longitude" value = { formulari.longitude } onChange={handleChange}/>
              </div>
                <div>
                  <input type="radio" id="visibility" name="visibility" value="1" checked onChange={handleChange}/>
                  <label htmlFor="public">Public</label>
                </div>
                <div>
                  <input type="radio" id="visibility" name="visibility" value="2" onChange={handleChange}/>
                  <label htmlFor="private">Contacts</label>
                </div>
                <div>
                  <input type="radio" id="visibility" name="visibility" value="3" onChange={handleChange}/>
                  <label htmlFor="private">Private</label>
                </div>
              <div>
                <input type="file" placeholder="Upload" id="upload" name="upload" onChange={handleChange}/>
              </div>
            
              <button onClick={updatePlace}>
                Submit
              </button>		

        </form>
      </div>		
    
    </>
)}

