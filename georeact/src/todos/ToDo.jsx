import React from 'react'
import '../App.css'

import { useDispatch, useSelector } from "react-redux";
import { deltodo, toggletodo } from "../slices/todoSlice";

import { FcFullTrash } from 'react-icons/fc';

export const ToDo = ({todo}) => {

  const dispatch = useDispatch();

  console.log(todo)

  return (
    <>
      {todo.done?
        <div id="divTodoDoneTrue">
          <td>{todo.id}</td>
          <td>{todo.description}</td>
        </div>
        :
          <>
            <td>{todo.id}</td>
            <td>{todo.description}</td>
          </>
        }{/*
      <button 
          onClick={(e) => {
            e.preventDefault();
            handleToggleTodo(todo.id); 
          }}>
            FET
      </button>
      <button 
          onClick={(e) => {
            e.preventDefault();
            handleToggleTodo(todo.id); 
          }}>
            NO FET
      </button>        
      <button className='deleteButton'
          onClick={(e) => {
            e.preventDefault();
            handleDelete(todo.id); 
          }}><FcFullTrash />
      </button>
      */}
      <button 
          onClick={() => dispatch(toggletodo(todo.id))}>
            FET
      </button>
      <button 
          onClick={() => dispatch(toggletodo(todo.id))}>
            NO FET
      </button>        
      <button className='deleteButton'
         onClick={() => dispatch(deltodo(todo.id))}><FcFullTrash />
      </button>

    </>
  )
}