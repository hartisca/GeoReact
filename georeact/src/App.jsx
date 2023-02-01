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
                <Route path="/posts" element={<PostList />} />
                <Route path="/posts/add" element={<PostAdd />} />
                <Route path="/posts/edit/id" element={<PostEdit />} />
                <Route path="/posts/grid" element={<PostsGrid />} />
                <Route path="/posts/list" element={<PostsList />} />                               
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
