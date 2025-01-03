import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"], // Use WebSocket and fallback to polling
});

export default socket;
