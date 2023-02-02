import React from 'react'
import { Link } from "react-router-dom";

function PostsMenu() {
  return (
      <>
    <div className='postsMenu'>
        <Link to="/posts/add" className=''>Add Post </Link>
        <Link to="/posts/grid" className=''>Grid </Link>        
        <Link to="/posts/list" className=''>List</Link>
    </div>
    </>
  )
}

export default PostsMenu