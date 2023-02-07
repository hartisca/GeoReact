
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";

function PlaceList({place}) {
  let { userEmail, setUserEmail } = useContext(UserContext);
  return (    
      <>
        <td>{place.id}</td>
        <td>{place.author.name}</td>
        <td>{place.comments_count}</td>                        
        <td>{place.latitude}</td>
        <td>{place.longitude}</td>
        <td>{places.visibility.name}</td> 

        {(userEmail == place.author.email) ?
          <td>
            <Link to={"/place/edit/" + place.id}>Edit </Link>            
          </td>
          : <td></td>
        }
      </>
  )
}

