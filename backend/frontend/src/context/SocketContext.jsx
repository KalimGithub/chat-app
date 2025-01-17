import { useAuth } from "./AuthProvider.jsx";
import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const socketContext = createContext();

// creating hook
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();
  const [onlineUsers, setonlineUsers] = useState([]);
  useEffect(() => {
    if (authUser) {
      const socket = io("https://chat-app-we38.onrender.com", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      socket.on("getOnline", (users) => {
        setonlineUsers(users);
        // console.log("online");
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
