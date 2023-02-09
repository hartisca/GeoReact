import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';

import { FcLike } from 'react-icons/fc';


function Post() {
  let { id } = useParams();
  let { userEmail, setUserEmail, authToken, setAuthToken } = useContext(UserContext);
  let [ isLoading, setIsLoading ] = useState (true);
  let [ post, setPost ] = useState ({});

  const getPost = async(e) => {
    try{
      const data = await fetch('https://backend.insjoaquimmir.cat/api/posts/' + id, {
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
        console.log(isLoading);
        setIsLoading(false);
      } else {
        alert ('Error en la resposta');
      }
    } catch{
      console.log('error');
    }

    useEffect(() => {
      getPost();
    }, [])

  }
  return (
    <>
      {(isLoading == true) ? <div>Carregant dades...</div> :
      <div>
      <img className="imgGrid" src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath } alt={ post.file.id } width="300"/>
        <p>Autor: {post.author.name}</p>
        <p>Latitud: {post.latitude}</p>
        <p>Longitud: {post.longitude}</p>
        <div className='InfoPost'>
            <p>Descripció: </p>
            {post.body}     
        </div>
        <FcLike />{post.likes_count}
      </div>
    }
    </>
  )
}

export default Post
