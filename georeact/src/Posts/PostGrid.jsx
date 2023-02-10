import React from "react";
import { Link } from "react-router-dom";

import { FcLike } from 'react-icons/fc';
import { AiOutlineComment } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';


export const PostGrid = ({ post }) => {
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
                    <Link to={"/posts/" +post.id}><BsEye /></Link>
                </div>
            </div>
        </>
    )
}