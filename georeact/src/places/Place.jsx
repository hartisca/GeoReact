import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../userContext';

function Place() {
  const { id } = useParams();
  return (
    <div>Place {id}</div> 
  )
}

export default Place

