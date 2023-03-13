import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  postsMarks: JSON.parse(localStorage.getItem("postsMarks")) || [],
  isMarked: false
};

export const postsMarks = createSlice({
 name: 'postsMarks',
 initialState, 
 reducers: {
    addpostMark: (state, action) => {
      state.postsMarks.push(action.payload); // aqui podem fer push
    },
    delpostMark: (state, action) => {
      state.postsMarks = state.postsMarks.filter((postMark) => postMark.id !== action.payload);
    },
    isMarked: (state, action) => {
      state.isMarked = false;

      state.postsMarks.map((mark) => {
        if (mark.id == action.payload){
          state.isMarked = true;
          console.log(state.isMarked);
      }
      })
    }
 }   
});
// Action creators are generated for each case reducer function
export const { addpostMark, delpostMark, isMarked } = postsMarks.actions

export const postReducer = postsMarks.reducer