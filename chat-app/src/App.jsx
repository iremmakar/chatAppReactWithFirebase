import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase/firebaseConfig";

import { onAuthStateChanged } from "firebase/auth";

import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import Chat from "./pages/chat";

function App() {
  const handleClick = () => {
    signInWithPopup(auth, provider);
  };

  const [isAuth, setIsAuth] = useState(true);
  const [room, setRoom] = useState(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => setIsAuth(false))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  };

  /*
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);
   */

  return (
    <div className="container">
      {isAuth && !room && (
        <form className="room-container" onSubmit={handleSubmit}>
          <h1>Hangi odaya gireceksiniz?</h1>
          <input type="text"></input>
          <button type="submit">Odaya gir</button>
          <button type="button" className="logout" onClick={handleLogout}>
            Çıkış yap
          </button>
        </form>
      )}

      {isAuth && room && <Chat room={room} setRoom={setRoom} />}

      {!isAuth && <Auth />}
    </div>
  );
}

export default App;
