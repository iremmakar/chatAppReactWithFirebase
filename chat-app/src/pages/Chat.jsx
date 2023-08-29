import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

import { auth } from "../firebase/firebaseConfig";
import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
  const messagesCol = collection(db, "messages");

  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target[0].value === "") return;

    addDoc(messagesCol, {
      text: e.target[0].value,
      user: "irem", //auth.currentUser.displayName,
      room,
      createdAt: serverTimestamp(),
    });

    e.target[0].value = "";
  };

  useEffect(() => {
    let comingMessages = [];

    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    onSnapshot(queryOptions, (snapshot) => {
      snapshot.forEach((doc) => {
        comingMessages.push(doc.data());
      });

      setMessages(comingMessages);
    });
  }, [messages]);

  return (
    <div className="chat">
      <header>
        <p>{/* {auth.currentUser.displayName} */}irem</p>
        <p>{room}</p>
        <a onClick={() => setRoom(null)}>Farklı Oda</a>
      </header>
      <main>
        {messages.map((msg) => (
          <Message msg={msg} user="irem" />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="mesajınızı yazınız ..." />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
