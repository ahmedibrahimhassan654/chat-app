import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // Replace with your backend URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen for welcome message from the server
    socket.on("welcome", (data) => {
      console.log(data.message);
    });

    // Listen for incoming messages
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", { message: input });
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "Me", message: input },
    ]);
    setInput("");
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div
          style={{
            border: "1px solid #ccc",
            height: "300px",
            overflowY: "scroll",
          }}
        >
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
