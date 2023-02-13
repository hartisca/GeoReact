import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../userContext";
import '../../App.css'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { AiOutlinePlusCircle } from 'react-icons/ai';

const CommentList = () => {
    const { id } = useParams();
    let [comments, setComments] = useState([]);
    let { authToken,setAuthToken } = useContext(UserContext);

    const getComments = async() =>{      
        try{
          const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments", {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            method: "GET"
  
          })
          const resposta = await data.json();

          if (resposta.success === true){
            console.log(resposta.data);
            setComments(resposta.data);
          } else{
            console.log(comments)
           }             
        }catch{
          console.log("Error");          
        }
  
      }
      
      useEffect(() => {
        getComments();
        
      }, [])


  return (
    <>
    <div>
        <h3>Afegeix commentari</h3>
        {comments.map((comment) => (
            (<p key={comment.id}>- {comment.user.name}: {comment.comment}</p>)
        ))}
    </div>
    <div>
        <Link to={"/posts/" +id+"/comments/add"}> <AiOutlinePlusCircle /></Link>
    </div>
    </>
  )
}

export default CommentList