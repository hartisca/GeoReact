import { createSlice } from '@reduxjs/toolkit'

const initialState = { postsMarks:JSON.parse(localStorage.getItem("postsMarks")) || [] };

export const postsMarks = createSlice({
 name: 'postsMarks',
 initialState, 
 reducers: {
    addpostmark: (state, action) => {
      state.postsMarks.push(action.payload); // aqui podem fer push
    },
    delpostmark: (state, action) => {
      state.postsMarks = state.postsMarks.filter((postsMarks) => postsMarks.id !== action.payload);
    },
    togglepostmark: (state, action) => {
      state.postsMarks = state.postsMarks.map((postsMarks) => {
        if (postsMarks.id === action.payload) {
          //id
          return { ...postsMarks, done: !postsMarks.done }; // invertim el done
        }
        return postsMarks;
      });
    }
  }
});
// Action creators are generated for each case reducer function
export const { addpostmark, delpostmark, togglepostmark } = postsMarks.actions

export const postReducer = postsMarks.reducer