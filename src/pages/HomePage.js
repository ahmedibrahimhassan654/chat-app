import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const HomePage = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    type: "user",
  });
  const { setUserInfo: setSocketUserInfo } = useSocket(); // Get the socket context function
  const navigate = useNavigate(); // For navigating to the next page

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Set the user info into socket context
    setSocketUserInfo(userInfo); // Update socket with user info

    // After submitting, navigate to the dashboard page
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Enter User Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={userInfo.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            name="type"
            value={userInfo.type}
            onChange={handleInputChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="provider">Povider</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
