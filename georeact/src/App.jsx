import { UserContext } from "./userContext";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './styles/loginRegister.css'
import "./App.css";

import About from "./About";
import NotFound from "./NotFound";
import { Post } from './Posts/Post';
import { PostMenu } from './Posts/PostMenu';

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoginRegister from "./auth/LoginRegister";

export default function App() {
  // difere`cnai entre emprar i no emprar state

  let [authToken, setAuthToken] = useState("");

  return (
    <>
      <UserContext.Provider
        value={{ authToken, setAuthToken }}
        // { authToken, setAuthToken } equival a  { authToken: authToken, setAuthToken:setAuthToken}
      >
        {authToken ? (
          <>
          <div className="bigbox">
            <div className="header">
              <Header />
            </div>
            <div className="container">
              <Routes>              
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Post />} />
                <Route path="/about" element={<About />} />
                <Route path="/posts/:id" element={ <><PostMenu/><Post/></> } />
                <Route path="/posts/add" element={ <><PostMenu/><PostAdd/></> } /> 
                <Route path="/posts/edit/:id" element={ <><PostMenu/><PostEdit/></> } /> 
                <Route path="/posts/grid" element={ <><PostMenu/><PostGrid/></> } /> 
                <Route path="/posts/list" element={ <><PostMenu/><PostList/> </> } />
              </Routes>
            </div>

            <div className="footer">
              <Footer />
            </div>
          </div>
              
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}
