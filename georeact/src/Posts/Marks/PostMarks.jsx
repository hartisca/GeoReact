import React from 'react'
import { useEffect, useReducer } from 'react'
import PostMark from './PostMark'
import { postMarkReducer } from './postMarkReducer'

import { useSelector } from 'react-redux';


const PostMarks = () => {

    const { marks } = useSelector(state => state.markposts);

    useEffect(() => {
      localStorage.setItem("marks", JSON.stringify(marks));
    }, [marks]);

    console.log(marks);
  return (
    <div>
      <h2>Markers</h2>

      {marks.map((mark) => (
        <PostMark key={mark.id} mark={mark}/>    
      ))};
  </div>
  )
}

export default PostMarks