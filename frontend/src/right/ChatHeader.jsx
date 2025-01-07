import { Avatar } from "@mui/material";
import React from "react";
import useConversation from "../stateManage/useConversation";
import { useSocketContext } from "../context/SocketContext";

function ChatHeader() {
  const { selectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id);
  return (
    selectedConversation && (
      <div className="flex w-100% px-6 py-4 gap-4 items-center bg-slate-800">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg">{selectedConversation.name} </h1>
          <p className="text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>
    )
  );
}

export default ChatHeader;
