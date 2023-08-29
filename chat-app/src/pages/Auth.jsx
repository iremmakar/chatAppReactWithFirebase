import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase/firebaseConfig";

const handleClick = () => {
  signInWithPopup(auth, provider)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const Auth = () => {
  return (
    <div className="auth">
      <h1>Chat Odası</h1>
      <p>Devam etmek için giriş yapın</p>
      <button onClick={handleClick}>
        <i class="fa-brands fa-google"></i>
        <span>Google ile gir</span>
      </button>
    </div>
  );
};

export default Auth;
