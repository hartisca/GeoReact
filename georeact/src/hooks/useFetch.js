import React from 'react'
import { useState, useEffect } from 'react'

function useFetch(initialUrl, iniitailOptions) {

    const [ url, setUrl ] = useState(initialUrl);
    const [ options, setOptions ] = useState(iniitailOptions);
    const [ data, setData ] = useState();
    const [ error, setError ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ refresh, setRefresh ] = useState();
    const reRender = () =>{
        setRefresh(!refresh);
    }

    useEffect(() => {
        
        setLoading(true);
        setError(undefined);

        async function fetchData() {
            try{
                const res = await fetch(url, options);
                const json = await res.json();
                setData(json);
                console.log(json);
            } catch (e){
                setError(e);
            }
            setLoading(false);
        }
        fetchData();
    }, [url, options, refresh]);

  return {data, error, loading, setUrl, setOptions, reRender};
}

export default useFetch