import React from 'react'
import Post from './Post';


function PostsList() {
  return (
    <>
        <td>{Post.id}</td>        
        <td>{Post.author.name}</td>
        <td>{Post.latitude}</td>
        <td>{Post.longitude}</td>
        <td>{Post.visibility.name}</td>
        <td>{Post.body}</td>
        <td><Link className="headerLink" to={"/posts/" +Post.id}><i className="bi bi-eye"></i></Link></td>
        
        {(usuari == place.author.email ) &&  
        <td><Link className="headerLink" to={"/posts/edit/" +Post.id}><i className="bi bi-pencil-square"></i></Link></td>}

         {(usuari == post.author.email ) ?  
        <td><i className="bi bi-trash3"></i></td> : <td/>}
    </>
  )
}

export default PostsList