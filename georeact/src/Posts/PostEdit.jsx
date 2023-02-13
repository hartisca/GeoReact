import React from 'react'
import { useState } from 'react';

import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import { useParams } from "react-router-dom";

function PostEdit() {
  const {id} = useParams();
  let [ formulari, setFormulari ] = useState({});
  let { authToken,setAuthToken } = useContext(UserContext);
  let [post, setPost] = useState({});
  
 
  const handleChange = (e) => {
    e.preventDefault();
    setError("");

    if (e.target.name==="upload")
      {
        console.log(e.target.files[0].name)
        setFormulari({
          ...formulari,
          [e.target.name] : e.target.files[0] 

        })
      }
    else 
    {
      setFormulari({
        ...formulari,
        [e.target.name] : e.target.value

      })
    };
  }
  const getPostEdit = async() =>{
    
    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "GET"

      })
      const resposta = await data.json();
      if (resposta.success === true){
        const { data } = resposta
        setFormulari({
          body: data.body,
          upload: "",
          latitude: data.latitude,
          longitude: data.longitude,
          visibility: data.visibility.id,

        })
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
  const editPost = async(e) => {

    e.preventDefault();

    let {body,upload,latitude,longitude,visibility}=formulari;
    console.log(formulari);
    var formData = new FormData();
    formData.append("body", body);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
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
        alert("Post editado correctamente");
        navigate("/posts/" + id)
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
  useEffect(() => {
    getPostEdit();
    editPost();
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
  return (
    <>
      <div className="containerAdd">
        <form id="formAddPost"className="addPost">
              <div className="title"><h3>Update your Post</h3></div>
              <div>
                <input type="text"placeholder="Body" id="body" name="body" onChange={handleChange}/>
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
            
              <button
            onClick={(e) => {
              editPost(e);
            }}>
            Submit
          </button> 

        </form>
      </div>		
    
    </>
)}

export default PostEdit