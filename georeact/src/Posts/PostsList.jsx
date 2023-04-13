import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import PostList from './PostList';

import useFetch from '../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPosts } from '../slices/posts/postSlice';
import { getPosts } from '../slices/posts/thunks';

function PostsList() {
    let { authToken, setAuthToken, userEmail, setUserEmail } = useContext(UserContext);   
    const { posts = [], page = 0, isLoading = true, error = "" } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts(authToken));
      dispatch(startLoadingPosts());
    }, []);

     const deletePost = async(id) => {
        try{
          
            const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+ id, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + authToken,
            },
            method: "DELETE"
          })
          const resposta = await data.json();
          if (resposta.success === true){
            console.log(resposta), 
            reRender();
          }
          else alert("La resposta no a triomfat");
    
          }catch{
            console.log("Error");
            alert("catch");  
          }
          
      }

    return (
        <>
        {isLoading ? 
        <table className='postTable'>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Author</th>
                    <th>Body</th>
                    <th>Comments</th>
                    <th>Latitude</th>                    
                    <th>Longitude</th>
                    <th>Likes</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                
                { posts.map ( (post)=> (
                    (post.visibility.name != 'private' || userEmail == post.author.email) &&
                    (<tr key={post.id}>
                        <PostList post={post} deletePost={deletePost} /></tr>)
                ))}
                
            </tbody>
        </table>
        : <div>Carregant...</div>
        }
        </>
    )
}

export default PostsList