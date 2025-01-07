import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const socketURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://chat-server-tdh-production.up.railway.app";

    // Initialize socket connection
    const socketInstance = io(socketURL, {
      auth: userData || { guest: true },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to backend with socket ID:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from backend");
    });

    socketInstance.on("userData", (data) => {
      setUserData(data); // Store user data received from backend
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [userData]); // Run once on mount

  const setUserInfo = (userInfo) => {
    if (socket) {
      socket.auth = userInfo; // Set user data on socket
      socket.connect(); // Reconnect the socket with updated auth data
      console.log("User info sent to socket:", userInfo);
      setUserData(userInfo); // Store user info in the context
    }
  };

  return (
    <SocketContext.Provider value={{ socket, userData, setUserInfo }}>
      {children}
    </SocketContext.Provider>
  );
};
