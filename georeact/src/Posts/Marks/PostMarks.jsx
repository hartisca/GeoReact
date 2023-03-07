import React from 'react'
import { useEffect, useReducer } from 'react'
import PostMark from './PostMark'
import { postMarkReducer } from './postMarkReducer'

const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("postsMarks")) || [];
};

const PostMarks = () => {

    const [postsMarks, dispatchMarks] = useReducer(postMarkReducer, initialState, init);

    useEffect(() => {
      localStorage.setItem("postsMarks", JSON.stringify(postsMarks));
    }, [postsMarks]);

    const handleDeleteMark = (id) => {
        console.log("Aqui arribo " + id);
        dispatchMarks({
          type: "Delete Mark",
          payload: id
        });
      };
    
      console.log(postsMarks);
  return (
    <div>
    {postsMarks.map((mark) => (
      <PostMark
        mark={mark}
        handleDeleteMark={handleDeleteMark}
      />
    ))}
  </div>
  )
}

export default PostMarks