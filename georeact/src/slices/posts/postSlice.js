import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    post: {
        file: {filepath:""},
        body: "",
        visibility:"",
        latitude: 0,
        longitude: 0,
    },
    page: 0,
    isLoading: false,
    error: "",
};

export const postSlice = createSlice({
 name: 'post',
 initialState,
 reducers: {
    startLoadingPosts: (state) => {
        //console.log("ABA")  
        state.isLoading = true;
    },
    setAdd: (state, action) => {
        state.add = action.payload
    }, 
    setError: (state, action) => {
        state.error = action.payload
    },
    setPosts: (state, action) => {
        state.posts = action.payload

        state.isLoading = false
    },
    setPost: (state, action) => {
        state.post = action.payload
        state.isLoading = false
    },
 }, 
})

// Action creators are generated for each case reducer function
export const { startLoadingPosts, setAdd, setError, setPosts, setPost } = postSlice.actions

export default postSlice.reducer