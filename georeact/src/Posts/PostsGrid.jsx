import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext'
import { PostGrid } from './PostGrid'

function PostsGrid() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ posts, setPosts ] = useState([]);
  let [refresh,setRefresh] = useState(false)

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
            setRefresh(!refresh);            
        }else{
            console.log('error')
        }

  }catch {
    console.log(data);    
  }
}
useEffect(() => { 
    getPosts();
 }, [refresh]);

  return (
    <>
      <div className="gridCont2">
        { posts.map ( (post)=> (               
          <div key={post.id}>
              <PostGrid post={post} deletePost={deletePost} /></div>
          ))}
      </div>
    </>
  )
}

export default PostsGrid