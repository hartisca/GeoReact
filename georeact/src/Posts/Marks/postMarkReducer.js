export const postMarkReducer = (initialState, action) =>{

    switch (action.type) {
        case "Add Mark":
            return[...initialState, action.payload];
        
        case "Delete Mark":
            return initialState.filter((mark)=> mark.id !== action.payload);
        
        default: 
        return [...initialState];
    }
};