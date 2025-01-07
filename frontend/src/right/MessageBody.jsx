import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../context/useGetMessage.js";
import Loading from "../Components/Loading.jsx";
import useConversation from "../stateManage/useConversation.js";

function MessageBody() {
  const { messages, loading } = useGetMessage();
  const { selectedConversation } = useConversation();
  // console.log(messages);
  const loggedInUser = JSON.parse(localStorage.getItem("ChatApp"));
  const loggedInUserName = loggedInUser.user.name;

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <>
      <div className="overflow-auto h-[calc(90vh-70px)] py-4 px-6">
        {loading ? (
          <Loading />
        ) : (
          messages.length > 0 &&
          messages.map((message) => {
            return (
              <div key={message._id} ref={lastMessageRef}>
                <Message message={message} />
              </div>
            );
          })
        )}

        {!loading && messages.length === 0 && (
          <>
            {selectedConversation ? (
              <div className="h-full flex flex-col justify-between items-center">
                <p className="text-center font-bold mt-44 text-xl">
                  Start Typing and press Enter to send a message
                </p>
              </div>
            ) : (
              <div className="h-auto flex flex-col justify-between items-center mt-32 gap-32">
                <div>
                  <p className="text-center font-bold text-xl">
                    Welcome {loggedInUserName}
                  </p>
                  <p className="text-center font-bold text-3xl">
                    Select a conversation to start messaging!!
                  </p>
                </div>
                <p className="text-center font-semibold flex-end mt-40">
                  Your personal messaging web application{" "}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default MessageBody;
