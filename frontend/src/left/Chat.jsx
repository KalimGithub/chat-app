import React from "react";
import useConversation from "../stateManage/useConversation.js";
import { useSocketContext } from "../context/SocketContext.jsx";
import sound from "../assets/notification.mp3";
function Chat({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex gap-4 items-center justify-start px-6 py-4 hover:bg-slate-800">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">{user.name}</h1>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
