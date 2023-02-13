
import { React } from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';

export function PlaceList({place}) {


  let { usuari, setUsuari } = useContext(UserContext);
  
  return (    
      <>
        <td>{place.id}</td>
        <td>{place.name}</td>
        <td>{place.author.name}</td>
        <td>{place.reviews_count}</td>                        
        <td>{place.latitude}</td>
        <td>{place.longitude}</td>
        <td>{place.visibility.name}</td> 

        {(usuari.email == place.author.email) ?
          <>
          <td>
            <Link to={"/place/edit/" + place.id}>Edit <i className="bi bi-pencil-fill"></i> </Link>     </td>
          <td>
            <Link to={"/places/delete/" + place.id}> <i className="bi bi-trash3-fill"></i></Link>  </td>
          <td>
            <Link to={"/places/" + place.id}> <i className="bi bi-eye-fill"></i></Link>
          </td>
          </>
          : <td><Link to={"/places/" + place.id}> <i className="bi bi-eye-fill"></i></Link></td>
        }
      </>
  )
}

