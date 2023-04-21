import React from 'react'
import { useSelector } from 'react-redux';
import { PaginateLink } from './PaginateLink';

const Paginate = () => {
  const { pages } = useSelector((state) => state.post);
  return (
    <>
      <ul className='paginaList'>
        {pages.map ((page) => (           
          <PaginateLink n={page}/>
        ))
        }     

      </ul>
    </>      
  )
}

export default Paginate