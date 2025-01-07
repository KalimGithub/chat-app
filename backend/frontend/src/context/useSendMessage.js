import React, { useState } from "react";
import useConversation from "../stateManage/useConversation";
import axios from "axios";
const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessages([...messages, response.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in send messages", error);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
