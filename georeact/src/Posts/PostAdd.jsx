import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";

function PostAdd() {
  let { authToken,setAuthToken } = useContext(UserContext);
  let [formulari, setFormulari] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name==="upload"){
      console.log(e.target.files[0].name)
      setFormulari({
        ...formulari,
        [e.target.name] : e.target.files[0] 
      })
    }else {
      setFormulari({
        ...formulari,
        [e.target.name] : e.target.value
      })
    };
  }

  const addPost = async(e) => {
    e.preventDefault();
    let { body, latitude , longitude, visibility } = formulari;
    console.log(formulari);
    var formdata = new FormData();
    formdata.append('body', body);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);
    formdata.append('visibility', visibility);

    try{
      const data = await fetch('https://backend.insjoaquimmir.cat/api/posts', {
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
        formulari.reset();
        alert ('Post successfully uploaded');
      } else{
        alert('There was an error uploading the post');
        console.log(formulari);
      }
    }catch{
      console.log('Error')
    }
}
  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (pos )=> {
      setFormulari({
        ...formulari,
        latitude :  pos.coords.latitude,
        longitude: pos.coords.longitude,
        
      })
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);    
    });
    }, [])
    return (
    <>
      <div>
        <div className="container">
          <form id="addPost"className="addPost">
            <h2 className="title">Add New Post</h2>
            
            <div>
              <input type="text" placeholder="Body" id="body" name="body" onChange={handleChange}/>
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
            <button className=""
              onClick={(e) => {
                addPost(e);
              }}>
              Submit
            </button>		

          </form>
        </div>		
    </div>
    </>
  )
}

export default PostAdd