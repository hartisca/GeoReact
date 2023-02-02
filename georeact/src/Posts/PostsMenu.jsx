import React from 'react'
import { Link } from "react-router-dom";

function PostsMenu() {
  return (
    <div className='PostMenu'>
        <Link className="MenuLinks" to="/posts/add">Add a Post</Link>
        <Link className="MenuLinks" to="/posts/grid"> Grid </Link>
        <Link className="MenuLinks" to="/posts/list"> List </Link>       
      </div>
  )
}

export default PostsMenu