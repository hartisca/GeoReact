import React from "react";
import { useContext } from "react";
import { UserContext } from "../../userContext";
import { CommentsContext } from "./CommentsContext";
import { useForm } from '../../hooks/useForm'

import { BsFillInfoCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";

import { addComment } from "../../slices/comments/thunks";

const CommentAdd = ({id}) => {
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);  
  const { comments = [], page=0, isLoading=true, add=true, error="", reviewsCount=0} = useSelector((state) => state.comments);

  const dispatch = useDispatch();
  const { formState, onInputChange, resetForm } = useForm({ comment: "" });
  
  const {comment} = formState

    

  return (
    <>
    <div class="flex mx-auto items-center justify-center  mt-6 mx-8 mb-4 max-w-lg">
      <form class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
        <div class="flex flex-wrap -mx-3 mb-6">
          <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Afegeix un nou comentari
          </h2>
          <div class="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              onChange={onInputChange}
              value={comment}
              class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="comment"
              placeholder="Escriu el teu comentari"
              required
            ></textarea>
          </div>
          <div class="w-full md:w-full flex items-start md:w-full px-3">
            <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
              <BsFillInfoCircleFill />
              <p class="text-xs md:text-sm pt-px">Some HTML is okay.</p>
            </div>
            <div class="-mr-1">
              <input
                onClick={(e)=> {e.preventDefault(); dispatch(addComment(comment, id, authToken))}}
                type="button"
                class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Afegeix el comentari"
              />
            </div>
            <div class="-mr-1">
              <input
                onClick={resetForm}
                type="button"
                class="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Buida"
              />
            </div>            
          </div>
        </div>
      </form>
    </div>
  </>
  )
}

export default CommentAdd