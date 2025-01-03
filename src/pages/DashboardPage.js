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
    }
  }, [socket]);

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
      {userData ? (
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
