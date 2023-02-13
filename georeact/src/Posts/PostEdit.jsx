import React from 'react'
import { useState } from 'react';

import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function PostEdit() {
  const {id} = useParams();
  let [ formulari, setFormulari ] = useState({});
  let { authToken, setAuthToken } = useContext(UserContext);
  let navigate = useNavigate();
   
  const handleChange = (e) => {
    e.preventDefault();
    setFormulari({
        ...formulari,
      [e.target.name]: e.target.type == "file" ? e.target.files[0] : e.target.value
    });
  };
  
    const getPost = async(e) => {
      try{
        
          const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer '  + authToken,
          },
          method: "GET"
        })
        const resposta = await data.json();
        if (resposta.success === true) console.log(resposta), setFormulari({              
          body : resposta.data.body,
          upload : resposta.data.file,
          latitude : resposta.data.latitude,
          longitude : resposta.data.longitude,
          visibility : resposta.data.visibility.id
        })
                    
        else {
          alert("La resposta no a triomfat");
        }
  
        }catch{
          console.log("Error");
        }
        
    }
    useEffect(() => 
    { getPost() },
     []);


    const sendPost = async(e) => {
      e.preventDefault();
      let {body,upload,latitude,longitude,visibility}=formulari;
      const formData = new FormData();      
      formData.append("body", body);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);
      try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken,
          },
          method: "POST",
          body: formData
        })
        const resposta = await data.json();
        if (resposta.success === true) console.log(resposta), navigate("/posts/"+ id);

        else alert("Error");
          
      }catch{
        console.log("Error");       
      }
      
    };
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
              sendPost(e);
            }}>
            Submit
          </button> 

        </form>
      </div>		
    
    </>
)}

export default PostEdit