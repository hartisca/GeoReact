import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { delpostmark } from "../../slices/postMarkSlice";

const PostMark = ({mark}) => {

  const dispatch = useDispatch();

  return (
    <tr>
        <td>{mark.id}</td>
        <td>{mark.body}</td>
        <Link className="headerLink" to={mark.route}><i className="bi bi-eye"></i></Link>
        <td><button onClick={ (e) => {dispatch(delpostmark(mark.id))}}>Borrar</button></td>
    </tr>
  )
}

export default PostMark