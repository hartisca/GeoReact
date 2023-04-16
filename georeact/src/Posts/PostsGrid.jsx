import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext'
import { PostGrid } from './PostGrid'
import { useDispatch, useSelector } from "react-redux";
import Paginate from './Paginate';

import { getPosts } from '../slices/posts/thunks';

function PostsGrid() {
  let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)
  const { posts = [], page=0, isLoading=true, message="",} = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getPosts(authToken, page));        
  }, [page]);

  return (
    <>
      {!isLoading ?
      <>
        <div className="gridCont2">
          { posts.map ( (post)=> (               
            <div key={post.id}>
                <PostGrid post={post} /></div>
            ))}
        </div>    
        
      </>
      :
      <div>Carregant...</div>
      }
      <div><Paginate /></div>
    </>
  )
}


export default PostsGrid