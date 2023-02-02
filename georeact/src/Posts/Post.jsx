import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';

function Post() {
  const { id } = useParams();
  return (
    <div>Post {id}</div>
  )
}

export default Post
