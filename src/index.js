import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import "./index.css";
import App from "./App";
import { SocketProvider } from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root element for React
root.render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
