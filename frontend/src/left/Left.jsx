import React from "react";
import LeftLogout from "./LeftLogout";
import Chats from "./Chats";
import SearchChats from "./SearchChats";
import { ToastContainer } from "react-toastify";

function Left() {
  return (
    <div className="bg-black w-[30%] flex">
      <LeftLogout />
      <div className="w-full">
        <h1 className="text-2xl font-bold px-4 pt-2">Chats</h1>
        <SearchChats />
        <div className="bg-slate-600  w-full px-6 py-2 mt-1">
          <h1 className="font-bold text-xl">Messages</h1>
        </div>
        <Chats />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Left;
