import React from 'react'
import { useState, useContext, useEffect } from 'react';

import { UserContext } from "../userContext";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getPost } from "../slices/posts/thunks"




function PostEdit() {
  const {id} = useParams();
  let [ formulari, setFormulari ] = useState({});
  let { authToken, setAuthToken } = useContext(UserContext);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { post = {}, isLoading=true, message=""} = useSelector((state) => state.post);
   
  const handleChange = (e) => {
    e.preventDefault();
    setFormulari({
        ...formulari,
      [e.target.name]: e.target.type == "file" ? e.target.files[0] : e.target.value
    });
  };
  
    
    useEffect(() => 
    { 
      dispatch(getPost(authToken, id))
    }, []);

    useEffect(() => {
      setFormulari({
        body: post.body,      
        longitude: post.longitude,      
        latitude: post.latitude,      
        visibility: post.visibility.id      
      })
    }, [post]);

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
              e.preventDefault()
              dispatch(editPost(id,authToken,formulari));             
            }}>
            Submit
          </button> 

        </form>
      </div>		
    
    </>
)}

export default PostEdit