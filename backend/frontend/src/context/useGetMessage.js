import React, { useState, useEffect } from "react";
import useConversation from "../stateManage/useConversation";
import axios from "axios";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  // console.log(selectedConversation);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          // console.log(response);

          setMessages(response.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
      setLoading(false);
    };
    getMessages();
  }, [setMessages, selectedConversation]);
  return { messages, loading };
}

export default useGetMessage;
