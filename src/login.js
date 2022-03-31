import React from "react";
import "./login.css";
import whatsapp__logo from "./whatsapp__logo.png";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { action__types } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: action__types.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="login">
      <div className="card">
        <img src={whatsapp__logo} alt="Image not found"/>
        <div className="card-body">
          <h1 className="card-title">Sign In to WhatsApp</h1>
          <button type="submit" className="btn btn-primary" onClick={signIn}>
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

