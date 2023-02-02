import React from 'react'

function PostList() {
  return (
      <>
        <td>{post.id}</td>
        <td>{post.author}</td>
        <td>{post.comments_count}</td>                        
        <td>{post.latitude}</td>
        <td>{post.longitude}</td>
        <td>{post.likes_count}</td> 
      </>
  )
}

export default PostList