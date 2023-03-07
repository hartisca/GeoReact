import React from 'react'
import { Link } from 'react-router-dom'
import PostMarks from './PostMarks'

const PostMark = ({mark, handleDeleteMark}) => {
  return (
    <tr>
        <td>{mark.id}</td>
        <td>{mark.body}</td>
        <td><Link to={mark.ruta}></Link></td>
        <td><button onClick={ (e) => {handleDeleteMark(mark.id)}}>Borrar</button></td>
    </tr>
  )
}

export default PostMark