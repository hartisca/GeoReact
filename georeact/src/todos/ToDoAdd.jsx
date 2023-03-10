import React, {useReducer} from "react";
import {useForm} from '../hooks/useForm'

import { useDispatch, useSelector } from "react-redux";
import { addtodo } from "../slices/todoSlice";


const ToDoAdd = ({}) => {

    const {formState, onInputChange} = useForm({
        todo: "",
    })
    const {todo} = formState;

    const dispatch = useDispatch();

    const toDoSubmit = (e) => {
        e.preventDefault();

        const newTodo = {

          id: new Date().getTime(),
          
          body: todo,
          
          done:false
          
          }
          
          //onResetForm()
          
          //handle(newTodo)
          console.log("Abans del dispatch");
          dispatch(addtodo(newTodo))
    }

  return (
    <>
         <div className='ReviewForm'>
          <form id="formAddReview" className='ReviewForm2'>
            <div className='labelReviewContainer'>
                <label htmlFor="todo">Afeigeix una Tasca</label>
            </div>
            <div className='containerTextarea'>
              <textarea id="description" name="todo" placeholder="Escriu la teva tasca aquí.." value = { todo } onChange={onInputChange}/>
            </div>
            <button className="addReviewButton"
                  onClick={(e) => { 
                    toDoSubmit(e);
                  }}>
                  Desa la Tasca
            </button>
          </form>
        </div>
    
    </>
  )
}

export default ToDoAdd