import React from "react";
import Chat from "./Chat";
import "../index.css";
import useGetAllUsers from "../context/useGetAllUsers";
function Chats() {
  const [allUsers] = useGetAllUsers();
  // console.log(allUsers);
  return (
    <div className="chats h-[calc(90vh-100px)] overflow-y-auto">
      {allUsers.map((user, index) => {
        return <Chat key={index} user={user} />;
      })}
    </div>
  );
}

export default Chats;
