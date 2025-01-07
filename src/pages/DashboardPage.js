import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom"; // To navigate back if disconnected
import AllTabComp from "../components/AllTab";

const DashboardPage = () => {
  const { socket, userData } = useSocket(); // Get socket and userData from context
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("ALL"); // State to track active tab
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

  // Render tab content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "ALL":
        return <AllTab />;
      case "Individual":
        return <IndividualTab />;
      case "Groups":
        return <GroupsTab />;
      default:
        return <AllTab />;
    }
  };

  return (
    <div>
      {userData ? (
        <>
          <h1>Welcome, {userData.name}!</h1>
          <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>

          {/* Tabs Navigation */}
          <div className="tabs">
            <button
              className={activeTab === "ALL" ? "active" : ""}
              onClick={() => setActiveTab("ALL")}
            >
              ALL
            </button>
            <button
              className={activeTab === "Individual" ? "active" : ""}
              onClick={() => setActiveTab("Individual")}
            >
              Individual
            </button>
            <button
              className={activeTab === "Groups" ? "active" : ""}
              onClick={() => setActiveTab("Groups")}
            >
              Groups
            </button>
          </div>

          {/* Render content based on the active tab */}
          <div className="tab-content">{renderTabContent()}</div>

          <button onClick={handleDisconnect} style={{ marginTop: "20px" }}>
            Disconnect
          </button>
        </>
      ) : (
        <p>No user is currently connected.</p>
      )}
    </div>
  );
};

export default DashboardPage;

// Placeholder components for tabs
const AllTab = () => {
  return (
    <>
      <div>All messages and chats will be displayed here.</div>
      <AllTabComp />
    </>
  );
};

const IndividualTab = () => {
  return <div>Individual chats will be displayed here.</div>;
};

const GroupsTab = () => {
  return <div>Group chats will be displayed here.</div>;
};
