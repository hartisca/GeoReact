  export const addPlace = (authToken,formulari) => {
    let { body, latitude , longitude, visibility=1, upload }  = formulari;
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
        setFormulari({})
        alert ('Post successfully uploaded');
      } else{
        alert('There was an error uploading the post');
        console.log(resposta);            
      }
    }     
}