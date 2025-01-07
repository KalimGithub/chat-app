import React from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageBody from "./MessageBody";

function Right() {
  return (
    <div className="bg-slate-600 w-[70%]">
      <div className="fixed top-0 w-full">
        <ChatHeader />
      </div>
      <div className="mt-20">
        <MessageBody />
      </div>
      <div className="fixed bottom-0 w-[100%]">
        <MessageInput />
      </div>
    </div>
  );
}

export default Right;
