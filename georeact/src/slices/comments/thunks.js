import { setAdd, setError, setComments, setcommentsCount, startLoadingComments } from "./commentSlice";

export const getComments = (page = 0, id, authToken, usuari="") => {

    return async (dispatch, getState) => {

        dispatch(startLoadingComments());
        
        const headers = {      

            headers: {            
                Accept: "application/json",                
                "Content-Type": "application/json",                
                Authorization: "Bearer " + authToken,            
            },            
            method: "GET",        
        };
        
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments"
        
        const data = await fetch(url, headers );
        
        const resposta = await data.json();
        
        if (resposta.success == true) {        
            dispatch(setComments(resposta.data));
            dispatch(setcommentsCount(resposta.data.length))        
        } else {        
            dispatch (setError(resposta.message));        
        }
    
        resposta.data.map((v) => {        
            if (v.user.email === usuari) {        
                dispatch (setAdd(false));            
                console.log("Te comentari");        
            }        
        });
        
    };
}

export const delComment = (comment, authToken) => {
    return async (dispatch, getState) => {    

        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + comment.post.id + "/comments/" + comment.id,
                {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
                }
            );
            const resposta = await data.json();
    
            console.log(resposta);
            if (resposta.success == true) {
                dispatch (setAdd(true));
                // usuari no l'indiquem i per defecta estarà a ""
                dispatch (getComments(0,comment.post.id, authToken))
                const state = getState()
                dispatch (setcommentsCount(state.commentsCount - 1));
            }

    };
};

export const addComment = (comment, id, authToken) => {

    return async (dispatch,getState) => {

        const formData = new FormData();

        formData.append("comment", comment);

        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments", {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authToken 
            },
            method: "POST",
            body: formData
        });

        const resposta = await data.json();

        if (resposta.success === true) {
            // usuari no l'indiquem i per defecta estarà a ""

            dispatch(getComments(0,id, authToken))
            dispatch(setAdd(false))

            const state = getState()
            dispatch (setcommentsCount(state.commentsCount + 1));
        }
        else dispatch(setMissatge(resposta.message));

    }
};
