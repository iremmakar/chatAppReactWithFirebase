import React from "react";

const Message = ({ msg, user }) => {
  console.log(msg, user);

  if (user === msg.user) {
    return <p className="msg-user">{msg.text}</p>;
  }

  return (
    <p className="msg-other">
      <span>{msg.user} </span>
      <span>{msg.text}</span>
    </p>
  );
};

export default Message;
