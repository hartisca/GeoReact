import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import PostList from './PostList';

function PostsList() {
    let { authToken, setAuthToken } = useContext(UserContext);
    let [posts, setPosts] = useState([]);

    const getPosts = async (e) =>{
        try{
            const data = await fetch ('https://backend.insjoaquimmir.cat/api/posts',{
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,
                  },
                  method: "GET"
            })
            const resposta = await data.json();
            if (resposta.success === true){
                setPosts(resposta.data);
                console.log(resposta);
            } else{
                alert('Error en la resposta!')
            }
        } catch{
            console.log('Error');
        }
    }

    useEffect(() => {
        getPosts();
      }, []);

    return (
        <>
            <table className='postTable'>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Author</th>
                        <th>Comment number</th>
                        <th>Body</th>                    
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Likes</th>
                    </tr>
                    
                    { posts.map ( (post)=> (                
                    (<tr key={post.id}>
                        <PostList post={post} />
                    </tr>)
                    ))}
                    
                </tbody>
            </table>
        </>
    )
}

export default PostsList