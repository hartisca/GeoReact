import React, { useState, useContext, useEffect, useCallback } from 'react';
import TimeAgo from 'react-timeago'
import '../../App.css'
import { UserContext } from '../../userContext';

import { FcFullTrash } from 'react-icons/fc';

export const Comment = ({comment, deleteComment}) => {
    let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext)

  return (
    <>
        <div className="containerComment">
            <h3>Commentari fet per {comment.user.name}</h3>
            <p>{comment.comment}</p>
            <TimeAgo date={comment.created_at} />
        </div>
        {(usuari == comment.user.email)&& 
            <button className="pointerClick"
                onClick={() => {
                deleteComment(comment.id); 
                }}><FcFullTrash />
            </button>
        }
    </>
  )
}
