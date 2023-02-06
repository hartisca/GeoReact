import React from "react";
import { FcLike } from 'react-icons/fc';

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
                </div>
            </div>
        </>
    )
}