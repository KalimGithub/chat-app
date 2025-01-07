import React from "react";

function Message({ message }) {
  const loggedInUser = JSON.parse(localStorage.getItem("ChatApp"));
  const isItMe = loggedInUser.user._id === message.senderId;

  const chatName = isItMe ? "chat-end" : "chat-start";
  const chatColor = isItMe ? "bg-blue-700" : "bg-slate-800";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className={`chat ${chatName} mb-2`}>
        <div
          className={`chat-bubble text-white ${chatColor} max-w-[50%] flex flex-col`}
        >
          <p className="pr-14">{message.message}</p>
          <p className="chat-time text-end text-sm opacity-50 mt-1">
            {formattedTime}
          </p>
        </div>
      </div>
      {/* <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary">
          What kind of nonsense is this
        </div>
      </div> */}
    </>
  );
}

export default Message;
