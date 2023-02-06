import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext'
import { PostGrid } from './PostGrid'

function PostsGrid() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ posts, setPosts ] = useState([]);

  const getPosts = async (e) =>{
    try{
        
        const data = await fetch ('https://backend.insjoaquimmir.cat/api/posts',{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '  + authToken,
              },
              method: "GET"
        })
        const resposta = await data.json();
        if (resposta.success === true){
            setPosts(resposta.data);
            console.log(resposta);
        } else{
            alert('Error en la resposta!')
        }
    } catch{
        console.log('Error');
    }
}

useEffect(() => { 
    getPosts();
 }, []);

  return (
    <>
      <div className="gridCont2">
        { posts.map ( (post)=> (               
          <div key={post.id}>
              <PostGrid post={post} /></div>
          ))}
      </div>
    </>
  )
}

export default PostsGrid