import { UserContext } from "./userContext";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './styles/loginRegister.css'
import "./App.css";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoginRegister from "./auth/LoginRegister";
import NotFound from "./NotFound";

import Post  from './Posts/Post';
import PostsMenu from './Posts/PostsMenu';
import PostAdd from './Posts/PostAdd';
import PostEdit from './Posts/PostEdit';
import PostsGrid from './Posts/PostsGrid';
import PostsList from './Posts/PostsList';


export default function App() {
  // difere`cnai entre emprar i no emprar state

  let [ authToken, setAuthToken ] = useState("");
  let [ usuari, setUsuari ] = useState("");
  let [ email, setUserEmail ] = useState("");
  
  /*let navigate = useNavigate();
  navigate("/places/")*/

  return (
    <>
      <UserContext.Provider
        value = { { usuari, setUsuari, authToken, setAuthToken, email,setUserEmail } }
        // { authToken, setAuthToken } equival a  { authToken: authToken, setAuthToken:setAuthToken}
      >
        {authToken ? (
          <>
          <div className="bigbox">
            <div>
              <Header />
            </div>
            <div className="container">
              <Routes>              
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<><PostsMenu /><Post /> </>} />
                <Route path="/posts" element={<><PostsMenu /><Post /> </>} />

                <Route path="/posts/list" element={<><PostsMenu /><PostsList /> </>} />
                <Route path="/posts/add" element={<><PostsMenu /><PostAdd /> </>} />
                <Route path="/posts/edit/:id" element={<><PostsMenu /><PostEdit /> </>} />
                <Route path="/posts/grid" element={<><PostsMenu /><PostsGrid /> </>} />
                <Route path="/posts/:id" element={<><PostsMenu /> <Post /></>} />

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
