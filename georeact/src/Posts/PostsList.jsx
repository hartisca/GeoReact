import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import PostList from './PostList';

import useFetch from '../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPosts } from '../slices/posts/postSlice';
import { getPosts } from '../slices/posts/thunks';

function PostsList() {
    let {authToken,setAuthToken, email, setUserEmail} = useContext(UserContext)   
    const { posts = [], page = 0, isLoading = true, error = "" } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getPosts(authToken));
    }, []);

    useEffect(()=>{
      console.log(posts)
      console.log(isLoading)
    },[posts])
     
    return (
        <>
        {!isLoading ? 
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
                    <th>Actions</th>                    
                </tr>
                
                { posts.map ( (post)=> (
                    (post.visibility.name != 'private' || email == post.author.email) &&
                    (<tr key={post.id}>
                        <PostList post={post} /></tr>)
                ))}
                
            </tbody>
        </table>
        : <div>Carregant...</div>
        }
        </>
    )
}

export default PostsList