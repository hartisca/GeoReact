import { useContext } from "react";
import { UserContext } from "./userContext";

export default function About() {
    let { authToken, setAuthToken } = useContext(UserContext);
  
    return (
      <>
        <div>
          <p>Lorem ipsum bla bla bla</p>
        </div>
        
      </>
    );
  }