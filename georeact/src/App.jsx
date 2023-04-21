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
import NotFound from "./NotFound";

import Post  from './Posts/Post';
import PostsMenu from './Posts/PostsMenu';
import PostAdd from './Posts/PostAdd';
import PostEdit from './Posts/PostEdit';
import PostsGrid from './Posts/PostsGrid';
import PostsList from './Posts/PostsList';
import CommentAdd from './Posts/Comentaris/CommentAdd';
import CommentList from './Posts/Comentaris/CommentList';

import ToDos from "./todos/ToDos";
import { PostMarks } from "./Posts/Marks/PostMarks";


export default function App() {  

  let [ authToken, setAuthToken ] = useState("");
  let [ usuari, setUsuari ] = useState("");
  let [ email, setUserEmail ] = useState("");
  
  /*let navigate = useNavigate();
  navigate("/places/")*/

  return (
    <>
      <UserContext.Provider
        value = { { usuari, setUsuari, authToken, setAuthToken, email, setUserEmail } }
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
                <Route path="/" element={<><PostsMenu /><PostsList /> </>} />
                <Route path="/posts" element={<><PostsMenu /><PostsList /> </>} />

                <Route path="/posts/list" element={<><PostsMenu /><PostsList /> </>} />
                <Route path="/posts/add" element={<><PostsMenu /><PostAdd /> </>} />
                <Route path="/posts/edit/:id" element={<><PostsMenu /><PostEdit /> </>} />
                <Route path="/posts/grid" element={<><PostsMenu /><PostsGrid /> </>} />
                <Route path="/posts/:id" element={<><PostsMenu /> <Post /></>} />
                <Route path="/posts/:id/comments" element={<> <PostsMenu/><CommentList /> </>} />
                <Route path="/posts/:id/comments/add" element={<> <PostsMenu/><CommentAdd /> </>} /> 

                           
                <Route path="/places/add" element={  <> <PlacesMenu/> <PlaceAdd/></> } />          
                <Route path="/places/grid" element={ <> <PlacesMenu/><PlacesGrid /> </>} />
                <Route path="/places" element={  <> <PlacesMenu/><PlacesList /> </>} /> 
                <Route path="/places/:id" element={  <> <PlacesMenu/> <Place/>  </> }/>
                <Route path="/places/edit/:id" element={  <> <PlacesMenu/> <PlaceEdit/>  </> }/>
                
                <Route path='/todos'element={<ToDos />}/>
                <Route path='/posts/marks' element={<PostMarks />}/>

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
