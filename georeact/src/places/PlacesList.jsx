
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";

function PlacesList(place) {
  let { userEmail, setUserEmail } = useContext(UserContext);
  return (    
      <>
        <td>{place.id}</td>
        <td>{place.author}</td>
        <td>{place.description}</td>                        
        <td>{place.latitude}</td>
        <td>{place.longitude}</td>
        <td>{place.visibility}</td> 

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