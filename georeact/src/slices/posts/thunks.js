  import { setAdd, startLoadingPosts, setError, setPosts, setPost, setMessage, setPages, setFilter } from "./postSlice";


  export const getPosts = (authToken, page=0) => {

    return async (dispatch, getState) => {

        dispatch(startLoadingPosts());        

        const headers = {
          headers: {          
            Accept: "application/json",
          
            "Content-Type": "application/json",
          
            Authorization: "Bearer " + authToken,          
          },          
          method: "GET",          
        };

        const filtre = getState().post.filter
        console.log(filtre);
                
        let url =
        page > 0
        ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page
        : "https://backend.insjoaquimmir.cat/api/posts";

        let inter = page > 0 ? "&" : "?";
        let body = filtre.body == "" ? "" : "body="+filtre.body;
        let author = filtre.author == "" ? "" : "author="+filtre.author;

        url = url + inter + body + "&" + author;
        console.log(url);
        const data = await fetch(url, headers);
 
        const resposta = await data.json();

        if (resposta.success == true) {

          if (page > 0) {
            dispatch(setPosts(resposta.data.collection));                
            dispatch(setPages(resposta.data.links));                                
          } else {                
            dispatch(setPosts(resposta.data));                
          }
        }

        else {
          dispatch(setMessage(resposta.message));
        }
      };
    }
  
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

  export const editPost = (id, authToken, formulari) => {
        

    return async (dispatch, state) => {
      dispatch(startLoadingPosts());

      
      let {body,upload,latitude,longitude,visibility}=formulari;
      const formData = new FormData();      
      formData.append("body", body);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);
      console.log(formData);
      console.log("ccccccc")

      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken,
          },
          method: "POST",
          body: formData
        })
        const resposta = await data.json();
        if (resposta.success === true) dispatch(setMessage("Post editat correctament"));

        else {dispatch(setMessage(resposta.message)); console.log(resposta.message)}
    }
  }

export const delPost = (id, authToken) => {

  return async (dispatch, getState) => {
    const data = await fetch("https://backend.insjoaquimmir.cat/api/posts" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + authToken,
      },
      method: "DELETE",
    })
    const resposta = await data.json();
    if(resposta.success == true){
      dispatch(setMessage("Post eliminat"))
    } else {
      dispatch(setMessage(resposta.message))
    }
  }
}