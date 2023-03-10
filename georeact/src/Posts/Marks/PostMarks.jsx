import React from 'react'
import { useEffect, useReducer } from 'react'
import PostMark from './PostMark'
import { postMarkReducer } from './postMarkReducer'

import { useSelector } from 'react-redux';


const PostMarks = () => {

    const { postsMarks, isMarked } = useSelector(state => state.postsMarks);

    useEffect(() => {
      localStorage.setItem("postsMarks", JSON.stringify(postsMarks));
    }, [postsMarks]);

    console.log(postsMarks);
  return (
    <div>
      <h2>Markers</h2>

      {postsMarks.map((mark) => (
        <PostMark key={mark.id} mark={mark}/>    
      ))};
  </div>
  )
}

export default PostMarks