import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";


import { CiEdit } from 'react-icons/ci';
import { FcFullTrash } from 'react-icons/fc';
import { BsEye } from 'react-icons/bs';



function PostList({post}) {
  let { userEmail, setUserEmail } = useContext(UserContext);
  return (    
      <>
        <td>{post.id}</td>
        <td>{post.author.name}</td>
        <td>{post.body}</td>  
        <td>{post.comments_count}</td>  
        <td>{post.latitude}</td>
        <td>{post.longitude}</td>
        <td>{post.likes_count}</td>
        <td><Link to={"/posts/" +post.id}><BsEye /></Link></td>

        {(userEmail == post.author.email) ?
          <td><Link to={"/posts/edit/" + post.id}><CiEdit /></Link></td>
          : <td></td>
        }

        {(userEmail == post.author.email) ?
        <td><i onClick={() => {
            deletePost(post.id);
          }}><FcFullTrash /></i></td>
          : <td></td>
        }
      </>
  )
}

export default PostList