import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext'
import { PostGrid } from './PostGrid'
import useFetch from '../hooks/useFetch';

function PostsGrid() {
  let { authToken, setAuthToken } = useContext(UserContext);

  let {data, error, loading, reRender} = useFetch('https://backend.insjoaquimmir.cat/api/posts',
      {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
        },
        method: "GET",
      })

  const deletePost = async (id) =>{
   try{
    const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authToken
        },
        method: "DELETE",
    })

    const resposta = await data.json();
        console.log(resposta);
        if (resposta.success === true) {
            reRender();            
        }else{
            console.log('error')
        }

  }catch {
    console.log(data);    
  }
}

  return (
    <>
      {!loading ?
      <div className="gridCont2">
        { data.data.map ( (post)=> (               
          <div key={post.id}>
              <PostGrid post={post} deletePost={deletePost} /></div>
          ))}
      </div>
      :
      <div>Carregant...</div>
      }
    </>
  )
}

export default PostsGrid