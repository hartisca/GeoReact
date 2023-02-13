import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import CommentList from './Comentaris/CommentList'

import { FcLike } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';

function Post() {
  let { id } = useParams();
  let { email, setUserEmail, authToken, setAuthToken } = useContext(UserContext);
  let [isLoading, setIsLoading] = useState(true)
  let [post, setPost] = useState({});

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
    if (resposta.success === true) setPost(resposta.data), console.log(resposta), setIsLoading(false);
    
    else (console.log(resposta));

    }catch{
      console.log("Error");
      alert("catch");  
    }    
}

  useEffect(() => { getPost(); }, []);
  return (

    <>{(isLoading == true) ? <div>Carregant dades...</div> :
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
      <div>
      {(email == post.author.email) ?
        <i onClick={() => {
            deletePost(post.id);
        }}><FcFullTrash /></i>
        : <div></div>
        }
      </div>  
      <div className='commentContainer'><CommentList id={post.id}/></div>  
    </div>
  }
  </> 
)
}

export default Post
