import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom"; // To navigate back if disconnected

const DashboardPage = () => {
  const { socket, userData } = useSocket(); // Get socket and userData from context
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate(); // To navigate back to home page if disconnected

  // Check if socket is connected
  useEffect(() => {
    if (socket) {
      setIsConnected(socket.connected);

      // Emit the 'user:online' event once socket is connected and user data is available
      if (userData) {
        socket.emit("user:online", { auth: userData });
      }

      // Listen for the 'dataBaseRooms' event
      socket.on("dataBaseRooms", (response) => {
        console.log("Received data from server:", response);
        // Handle response (rooms or message)
      });

      // Listen for 'error' event in case of any error from backend
      socket.on("error", (error) => {
        console.error("Error from server:", error);
      });
    }
  }, [socket, userData]);

  // Handle user disconnect
  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect(); // Disconnect the socket
      setIsConnected(false); // Set connected to false
      navigate("/"); // Navigate back to home page
    }
  };

  return (
    <div>
      {userData && isConnected ? (
        <>
          <h1>User {userData.name} is connected now!</h1>
          <button onClick={handleDisconnect}>Disconnect</button>
        </>
      ) : (
        <p>No user is currently connected.</p>
      )}
    </div>
  );
};

export default DashboardPage;
