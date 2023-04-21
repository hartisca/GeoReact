import React from 'react'
import { useState, useEffect } from 'react'


/**
 * Custom hook to handle fetching data from an API.
 *
 * @param {string} initialUrl - The initial URL to fetch data from.
 * @param {Object} iniitailOptions - The initial options for the fetch request.
 * @returns {Object} - An object containing data, error, loading state, setUrl, setOptions, and reRender functions.
 */

function useFetch(initialUrl, iniitailOptions) {

    const [ url, setUrl ] = useState(initialUrl);
    const [ options, setOptions ] = useState(iniitailOptions);
    const [ data, setData ] = useState();
    const [ error, setError ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ refresh, setRefresh ] = useState();

      /**
     * Function to trigger a re-render of the component.
     */
    const reRender = () =>{
        setRefresh(!refresh);
    }

    useEffect(() => {
        
        setLoading(true);
        setError(undefined);

        /**
         * Async function to fetch data from the API.
         */

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

    /**
     * Returns an object containing data, error, loading state, setUrl, setOptions, and reRender functions.
     */
  return {data, error, loading, setUrl, setOptions, reRender};
}

export default useFetch