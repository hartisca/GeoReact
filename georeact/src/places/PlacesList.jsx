
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";

function PlacesList(post) {
  let { userEmail, setUserEmail } = useContext(UserContext);
  return (    
      <>
        <td>{post.id}</td>
        <td>{post.author}</td>
        <td>{post.description}</td>                        
        <td>{post.latitude}</td>
        <td>{post.longitude}</td>
        <td>{post.visibility}</td> 

        {(userEmail == place.author.email) ?
          <td>
            <Link to={"/places/edit/" + place.id}>Edit </Link>            
          </td>
          : <td></td>
        }
      </>
  )
}

export default PlacesList