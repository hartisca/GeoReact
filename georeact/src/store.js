import { configureStore } from '@reduxjs/toolkit'


import todosReducer from "./slices/todoSlice"
import postReducer from './slices/postMarkSlice'
import commentReducer from './slices/comments/commentSlice'
import  postSlice  from './slices/posts/postSlice'


export const store = configureStore({
  reducer: {
      todos: todosReducer,
      postMarks: postReducer,
      comments: commentReducer,
      post: postReducer
    }
})