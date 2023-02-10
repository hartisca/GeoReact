import React from 'react'

import { useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import { useParams } from "react-router-dom";

function PostEdit() {
  const {id} = useParams();
  let [ formulari, setFormulari ] = useState({});
  let { authToken,setAuthToken } = useContext(UserContext);
  let [post, setPost] = useState({});
  
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

  const getPosts = async (e) =>{
    try{        
      const data = await fetch ('https://backend.insjoaquimmir.cat/api/posts' +id,{
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + authToken,
            },
            method: "GET"
      })
      const resposta = await data.json();
      if (resposta.success === true){
          setPost(resposta.data);
          console.log(resposta);
      } else{
          alert('Error en la resposta!')
      }
    }catch{
      console.log('Error');
    }
}

  useEffect(() => { 
    getPosts();
  }, []);

  const updatePost = async(e) => {
    e.preventDefault();

    let { body, latitude , longitude, visibility=1, upload }  = formulari;
    console.log(formulari);
    const formdata = new FormData();        
    formdata.append('body', body);
    formdata.append('upload', upload);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);
    formdata.append('visibility', visibility);
    console.log(formulari)

    try{
      const data = await fetch('https://backend.insjoaquimmir.cat/api/posts' +id, {
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
        alert ('Post successfully uploaded');
      } else{
        alert('There was an error uploading the post');
        console.log(resposta);            
      }
    }catch{
      console.log('Error')
    }
  }
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
            
              <button onClick={addPost}>
                Submit
              </button>		

        </form>
      </div>		
    
    </>
)}

export default PostEdit