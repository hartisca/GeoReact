import React, { useContext, useEffect, useState, useReducer } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import  CommentList  from './Comentaris/CommentList'

import { FcLike } from 'react-icons/fc';
import { FcFullTrash } from 'react-icons/fc';
import { FaSave } from 'react-icons/fa';

import { useDispatch, useSelector } from "react-redux";
import { addmark } from '../slices/postMarkSlice';
import { ismarked } from '../slices/postMarkSlice';

import { getPost } from '../slices/posts/thunks';



const init = () => {
  // Si localstorage tornes null tornariem un array buit
  return JSON.parse(localStorage.getItem("postmarks")) || [];
};

function Post() {
  const { postMarks, isMarked } = useSelector(state => state.postMarks);
  const { post, isLoading } = useSelector(state => state.post);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();  
  let { email, setEmail, authToken, setAuthToken } = useContext(UserContext);

  let [refresh,setRefresh] = useState(false)

  const anotaPost = () => {
        
    const dada = {
      id: post.id,
      body: post.body,
      ruta: pathname,
    };

    dispatch(addmark( dada))
    console.log(dada);
    alert("Has añadido este post a tus marcados!")
  };

  
  useEffect(() => { 
    dispatch(getPost(authToken, id)); 
  }, [refresh]);
  
  useEffect(() => {
    dispatch(ismarked(id));
    localStorage.setItem('postmarks', JSON.stringify(postMarks));
  }, [postMarks]);
  
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
      if (resposta.success === true)
        console.log(resposta),
        alert("Se ha eliminat correctament."),
        setRefresh(!refresh);
      
      else alert("La resposta no a triomfat");

    }catch{
      console.log("Error");
      alert("catch");  
    }
  }


  return (

    <>{(isLoading == true) ? <div>Carregant dades...</div> : 

    <div className='containerGridandcomment'>
      <img className="imgGrid" src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath } alt={ post.file.id } width="300"/>
        <p>Autor: {post.author.name}</p>
        <p>Latitud: {post.latitude}</p>
        <p>Longitud: {post.longitude}</p>
        <div className="iconosGridDer">
              { !isMarked ? (<button
                  className="buttonicon"
                  onClick={(e) => anotaPost(e)}
                >
                  <FaSave className='icButtonSave'/>
                </button>) : (<button
                  className="buttonicon"
                >
                  <FaSave className='icButtonSaved'/>
                </button>)}
              </div>
        <div className='InfoPost'>
            <p>Descripció: </p>
            {post.body}    
        </div>
          <FcLike />{post.likes_count}  
        <div>
          {(email == post.author.email) ?
            <i onClick={() => {
                deletePost(post.id);
            }}><FcFullTrash /></i>
            : <div></div>
            }
        </div>  
        
          <div className='commentContainer'><CommentList id={post.id}/></div>                
    </div>
  }
  </> 
)
}

export default Post
