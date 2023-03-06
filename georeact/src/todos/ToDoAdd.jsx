import React, {useReducer} from "react";
import {useForm} from '../hooks/useForm'


const ToDoAdd = ({handle}) => {

    const {formState, onInputChange} = useForm({
        todo: "",
    })
    const {todo} = formState;

    const toDoSubmit = (e) => {
        e.preventDefault();

        const newToDo = {

            id: new Date().getTime(),
            done: false,
            description: todo,
        }
        handle(newToDo);
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