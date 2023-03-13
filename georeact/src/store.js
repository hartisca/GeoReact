import { configureStore } from '@reduxjs/toolkit'

import todosReducer from "./slices/todoSlice"
import { postReducer } from './slices/postMarkSlice'


export const store = configureStore({
  reducer: {
      todos: todosReducer,
      markposts: postReducer 
    }
})