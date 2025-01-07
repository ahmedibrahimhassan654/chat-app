import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const AllTabComp = () => {
  const { socket } = useSocket(); // Access socket from context
  const [rooms, setRooms] = useState([]); // State to store rooms
  const [message, setMessage] = useState(""); // State to store message

  useEffect(() => {
    if (socket) {
      // Listen for the 'dataBaseRooms' event from the backend
      socket.on("dataBaseRooms", (response) => {
        console.log("Received dataBaseRooms event:", response);

        if (response.rooms && response.rooms.length > 0) {
          setRooms(response.rooms); // Store rooms in state
        } else {
          setMessage(response.msg || "No rooms available.");
        }
      });

      // Cleanup listener on component unmount
      return () => {
        socket.off("dataBaseRooms");
      };
    }
  }, [socket]);

  return (
    <div>
      <h2>All Chat Rooms</h2>
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => (
            <li key={room._id}>
              <h3>{room.roomName}</h3>
              <p>Members: {room.members.map((m) => m.username).join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default AllTabComp;
