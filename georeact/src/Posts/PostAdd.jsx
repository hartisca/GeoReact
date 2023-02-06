import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../userContext";

function PostAdd() {
  let { authToken,setAuthToken } = useContext(UserContext);

      useEffect(() => {

        navigator.geolocation.getCurrentPosition( (pos )=> {
          setFormulari({
            ...formulari,
            latitude :  pos.coords.latitude,
            longitude: pos.coords.longitude,
            visibility : 1
          })
      
        });
      }, [])
      const addPost = async(e) => {
        e.PreventDefault();
        let { body, latitude , longitude, visibility };
        console.log(formulari);
        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('body', body);
        formdata.append('latitude', latitude);
        formdata.append('longitude', longitude);
        formdata.append('visibility', visibility);

        try{
          const data = await fetch('https://backend.insjoaquimmir.cat/api/places', {
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
            formaddpost.reset();
            alert ('Post successfully uploaded');
          } else{
            alert('There was an error uploading the post');
            console.log(formulari);
          }
        }catch{
          console.log('Error')
        }
      }
    return (
    <>
      <div className="containerAdd">
        
      </div>
    </>
  )
}

export default PostAdd