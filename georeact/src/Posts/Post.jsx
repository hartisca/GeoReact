import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';

export const Post = () => {
    const { id } = useParams();
  return (
    <div>Post {id} </div>
  )
}
