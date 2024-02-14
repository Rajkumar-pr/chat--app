import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import './Client.css'
const socket = io.connect("http://localhost:3001");

function Client() {
  // Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setMessage(""); // Clear input after sending message
  };

  useEffect(() => {
    const socketListener = socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      socketListener.off("receive_message");
    };
  }, []);

  return (
    <div className="chat-screen">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className="chat-input">
        <input
          placeholder="Message..."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
      <input
        placeholder="Room Number..."
        value={room}
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      </div>
    </div>
  );
}

export default Client;
