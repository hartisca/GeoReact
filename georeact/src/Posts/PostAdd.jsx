import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../slices/posts/thunks';

const initialState = {
  posts: [],
  page: 0,
  isLoading: false,
  error: "",
};

function PostAdd() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ formulari, setFormulari ] = useState(initialState);
  
  const dispatch = useDispatch();

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
        };
    }
      useEffect(() => {        
        navigator.geolocation.getCurrentPosition( (pos )=> {
          setFormulari({
            ...formulari,
            latitude :  pos.coords.latitude,
            longitude: pos.coords.longitude,            
          })      
        });
      }, [])

    return (
    <>
      <div className="containerAdd">
      <form id="formAddPost"className="addPost">
            <div className="title"><h3>Add New Post</h3></div>
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
           
            <button onClick={(e) => (e.preventDefault(), 
                dispatch(addPost(formulari, authToken)))}>
              Submit
            </button>		

          </form>
      </div>		
     
    </>
  )
}

export default PostAdd