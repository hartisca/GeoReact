import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../userContext'
import { useContext } from "react";


import { FcLike } from 'react-icons/fc';
import { AiOutlineComment } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { FcFullTrash } from 'react-icons/fc';
import { CiEdit } from 'react-icons/ci';


export const PostGrid = ({ post, deletePost }) => {
    let { usuari, setUsuari, authToken, setAuthToken, email, setUserEmail } = useContext(UserContext)
    return(
        <>
            <div className="containerGrid">
                <p>{post.author.name}</p>
                <img className="imgGrid" src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath } alt={ post.file.id } width="300"/>
                <div className="bodyGrid">
                    {post.body}
                </div>
                <div className="likes">
                    <FcLike />{post.likes_count}
                    <AiOutlineComment />{post.comment_count}
                </div>
                <div>
                    <Link to={"/posts/" +post.id}><BsEye /></Link>  
                    {(email == post.author.email) ?
                    <Link to={"/posts/edit/" + post.id}><CiEdit /></Link>
                    : <div></div>
                    }

                    {(email == post.author.email) ?
                    <i className="pointerClick" onClick={() => {
                        deletePost(post.id);
                    }}><FcFullTrash /></i>
                    : <div></div>
                    }
                </div>              
            </div>
            
        </>
    )
}