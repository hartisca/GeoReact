import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";

function PostList({post}) {
  let { userEmail, setUserEmail } = useContext(UserContext);
  return (    
      <>
        <td>{post.id}</td>
        <td>{post.author.name}</td>
        <td>{post.comments_count}</td>                        
        <td>{post.latitude}</td>
        <td>{post.longitude}</td>
        <td>{post.likes_count}</td> 

        {(userEmail == post.author.email) ?
          <td>
            <Link to={"/posts/edit/" + post.id}>Edit </Link>            
          </td>
          : <td></td>
        }
      </>
  )
}

export default PostList