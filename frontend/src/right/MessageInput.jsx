import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import { Fade } from "@mui/material";
import useSendMessage from "../context/useSendMessage.js";
import useConversation from "../stateManage/useConversation.js";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { selectedConversation } = useConversation();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };

  return selectedConversation ? (
    <form
      className="flex gap-6 items-center px-4 py-2 bg-slate-700"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input input-bordered w-[50%] text-white bg-slate-800 outline-none px-6 py-4 rounded-lg"
      />
      <Tooltip
        title="Send Message"
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
          <SendIcon className="cursor-pointer" />
        </button>
      </Tooltip>
    </form>
  ) : null;
}

export default MessageInput;
