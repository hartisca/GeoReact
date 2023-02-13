import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../userContext";
import PostList from './PostList';

function PostsList() {
    let { authToken, setAuthToken, userEmail, setUserEmail } = useContext(UserContext);
    let [posts, setPosts] = useState([]);
    let [refresh,setRefresh] = useState(false)
       
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
     }, [refresh]);

     const deletePost = async(id) => {
        try{
          
            const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+ id, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + authToken,
            },
            method: "DELETE"
          })
          const resposta = await data.json();
          if (resposta.success === true) console.log(resposta), setRefresh(!refresh);
          
          else alert("La resposta no a triomfat");
    
          }catch{
            console.log("Error");
            alert("catch");  
          }
          
      }

    return (
        <table className='postTable'>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Author</th>
                    <th>Body</th>
                    <th>Comments</th>
                    <th>Latitude</th>                    
                    <th>Longitude</th>
                    <th>Likes</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                { posts.map ( (post)=> (
                    (post.visibility.name != 'private' || userEmail == post.author.email) &&
                    (<tr key={post.id}>
                        <PostList post={post} deletePost={deletePost} /></tr>)
                ))}
            </tbody>
        </table>
    )
}

export default PostsList