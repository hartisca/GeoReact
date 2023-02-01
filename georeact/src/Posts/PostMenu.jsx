import React from 'react'
import { Link } from "react-router-dom";

function PostMenu() {
  return (
    <div className='PostMenu'>
            <Link className="MenuLinks" to="/post/add">Añadir Place <i className="bi bi-plus-square"></i></Link>
            <Link className="MenuLinks" to="/post/grid"> Grid <i className="bi bi-grid"></i></Link>
            <Link className="MenuLinks" to="/post/list"> List <i className="bi bi-card-list"></i></Link>
        </div>
  )
}

export default PostMenu