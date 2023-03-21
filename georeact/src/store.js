import { configureStore } from '@reduxjs/toolkit'


import todosReducer from "./slices/todoSlice"
import postReducer from './slices/postMarkSlice'
import commentReducer from './slices/comments/commentSlice'


export const store = configureStore({
  reducer: {
      todos: todosReducer,
      postMarks: postReducer,
      comments: commentReducer
    }
})