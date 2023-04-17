import React, { useContext, useEffect } from 'react'
import { UserContext } from '../userContext'


function useLogin() {
    let {usuari, setUsuari, email, setUserEmail, authToken, setAuthToken} = useContext(UserContext);

    const checkAuthToken = async () => {

        let validToken = localStorage.getItem("authToken") || "";

        if ( validToken.length > 0){
            try{
                const data = await fetch('https://backend.insjoaquimmir.cat/api/user', {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + validToken,
                    },
                    method: "GET"
                })
                const resposta = await data.json();
                if (resposta.success === true){
                    setAuthToken(validToken);
                    setUserEmail(resposta.email);
                    setUsuari(resposta.usuari);
                }else{
                    setAuthToken("");
                }
            } catch {
                setAuthToken("");
                console.log('Error');
            }
        } else{
            console.log("No hi ha un token")
        }
    }

    const doLogin = async (email, password) => {
        console.log('Comprovant credencials..')
        try{
            const data = await fetch('https://backend.insjoaquimmir.cat/api/login', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                },
            method: "POST",
            body: JSON.stringify({ email: email, password: password })
            })
            const resposta = await data.json();
            console.log(resposta);
            if(resposta.success === true){
                setAuthToken(resposta.authToken)
                localStorage.setItem("authToken",resposta.authToken);
                setUser(resposta.usuari);
                setUserEmail(resposta.email);
                console.log(resposta.authToken, usuari);
            }else{
                console.log('error LOGIN');
            }
        } catch {
            console.log(data);
        }
    }

    useEffect(() => {
        checkAuthToken();
    }, []);

  return { doLogin } ;
}

export default useLogin