import { createSlice } from '@reduxjs/toolkit'

/**
 * The initial state for the postSlice
 * @type {InitialState}
 */
const initialState = {
    posts: [],
    post: {
        file: {filepath:""},
        author: { name: ""},
        body: "",
        visibility:"",
        latitude: 0,
        longitude: 0,
    },  
    page: 0,  
    isLoading: false,
    error: "",
    message: "",
    page: 1,
    pages: [],
};


/**
 * A Redux toolkit slice for handling posts.
 * @type {PostSlice}
 */
export const postSlice = createSlice({
 name: 'post',
 initialState,
 reducers: {
     /**
     * A reducer for setting isLoading to true.
     * @param {InitialState} state - The current state
     */
    startLoadingPosts: (state) => {         
        state.isLoading = true;
        
    },
      /**
     * A reducer for setting the add property of the state.
     * @param {InitialState} state - The current state
     * @param {Object} action - The payload containing the add value
     * @param {*} action.payload - The value to set for the add property
     */
    setAdd: (state, action) => {
        state.add = action.payload
    }, 
     /**
     * A reducer for setting the error property of the state.
     * @param {InitialState} state - The current state
     * @param {Object} action - The payload containing the error message
     * @param {string} action.payload - The error message to set
     */
    setError: (state, action) => {
        state.error = action.payload
    },
    /**
     * A reducer for setting the posts property of the state.
     * @param {InitialState} state - The current state
     * @param {Object} action - The payload containing the posts array
     * @param {Array} action.payload - The array of posts to set
     */
    setPosts: (state, action) => {
        state.posts = action.payload

        state.isLoading = false
    },
    setPost: (state, action) => {
        state.post = action.payload
        
        state.isLoading = false
    },
    setMessage: (state, action) => {
        state.message = action.payload
    },
    setPage: (state,action) => {

        state.page = action.payload        
    },

    setPages: (state,action) => {

        state.pages = action.payload        
    },
 }, 
})

// Action creators are generated for each case reducer function
export const { startLoadingPosts, setAdd, setError, setPosts, setPost, setMessage, setPage, setPages } = postSlice.actions

export default postSlice.reducer