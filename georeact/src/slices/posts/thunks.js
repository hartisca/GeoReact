  import { setAdd, startLoadingPosts, setError, setPosts, setPost } from "./postSlice";


  export const getPosts = (authToken) => {

    return async (dispatch, getState) => {
      dispatch(startLoadingPosts());

      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        method: "GET",
      })
    
    const resposta = await data.json();
    if (resposta.success === true) {
      console.log(resposta.data);

      dispatch(setPosts(resposta.data));
        
    }else{
       console.log(resposta.message);
    }
  }};

  
  export const getPost = (authToken, id) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingPosts());

        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '  + authToken,
            },
            method: "GET",
        })

        const resposta = await data.json();
        
        if (resposta.success == true) {
          dispatch(setPost(resposta.data));
        }
        else {
          dispatch(setError(resposta.error));
        }
    };
  }

  

  export const addPost = (formulari, authToken) => {

    let { body, latitude , longitude, visibility = 1, upload }  = formulari;
    console.log(formulari);
    const formdata = new FormData();        
    formdata.append('body', body);
    formdata.append('upload', upload);
    formdata.append('latitude', latitude);
    formdata.append('longitude', longitude);
    formdata.append('visibility', visibility);
    console.log(formulari)

    return async (dispatch, getState) => {
        dispatch(startLoadingPosts());
            
      const data = await fetch('https://backend.insjoaquimmir.cat/api/posts', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formdata
      })

      const resposta = await data.json();
      
      if (resposta.success === true){
        console.log(resposta);        
        alert ('Post successfully uploaded');
      } else{
        alert('There was an error uploading the post');
        console.log(resposta);            
      }
    }     
  }