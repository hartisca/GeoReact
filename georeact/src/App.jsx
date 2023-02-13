
import { UserContext } from "./userContext";
import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { PlacesMenu } from "./places/PlacesMenu";  
import { PlacesGrid } from "./places/PlacesGrid"; 
import { PlaceAdd } from "./places/PlaceAdd"; 
import { PlaceEdit  } from "./places/PlaceEdit"; 
import { PlacesList } from "./places/PlacesList";

import { Place  } from "./places/Place"; 
 

import './styles/loginRegister.css'
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoginRegister from "./auth/LoginRegister";

export default function App() {
  

  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  return (
    <>
      <UserContext.Provider
        value={{ usuari, setUsuari, authToken, setAuthToken }}
        
      >
        {authToken ? (
          <>
            <Header />

              <Routes>              
              <Route path="/" element={ <> <PlacesMenu/> <PlacesList/>  </>} />               
                <Route path="/places/add" element={  <> <PlacesMenu/> <PlaceAdd/></> } />          
                <Route path="/places/grid" element={ <> <PlacesMenu/><PlacesGrid /> </>} />
                <Route path="/places" element={  <> <PlacesMenu/><PlacesList /> </>} /> 
                <Route path="/places/:id" element={  <> <PlacesMenu/> <Place/>  </> }/>
                <Route path="/places/edit/:id" element={  <> <PlacesMenu/> <PlaceEdit/>  </> }/>
              </Routes>

              <Footer />
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}
