import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
