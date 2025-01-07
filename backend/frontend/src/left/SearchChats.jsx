import React, { useState } from "react";
import { Fade, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useGetAllUsers from "../context/useGetAllUsers";
import useConversation from "../stateManage/useConversation";
import { ToastContainer, toast } from "react-toastify";

function SearchChats() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  //   console.log(allUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) => {
      return user.name?.toLowerCase().includes(search.toLowerCase());
    });
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
      // console.log(conversation);
    } else {
      toast.error("User not found");
      setSearch("");
    }
  };

  return (
    <>
      <form
        className="flex gap-2 items-center px-4 py-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search Chats"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered max-w-xs rounded-lg text-white bg-slate-800 outline-none px-4 py-2"
        />
        <Tooltip
          title="Search"
          placement="right"
          arrow
          slots={{
            transition: Fade,
          }}
          slotProps={{
            transition: { timeout: 200 },
          }}
        >
          <button type="submit">
            <SearchIcon className=" rounded-full cursor-pointer" />
          </button>
        </Tooltip>
      </form>
    </>
  );
}

export default SearchChats;
