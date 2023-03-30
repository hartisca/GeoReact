import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    page: 0,
    isLoading: false,
    error: "",
};

export const postSlice = createSlice({
 name: 'post',
 initialState,
 reducers: {
 
 }, 
})

// Action creators are generated for each case reducer function
export const { increment } = postSlice.actions

export const postReducer = postSlice.reducer