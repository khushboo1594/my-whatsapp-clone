import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import db from "./firebase";
import "./SidebarChat.css";
import { NavLink } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [lastmessages, setlastmessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
          setlastmessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);
  const createChat = () => {
    console.log("inside addNewChat");
    const roomName = prompt("Please enter name for chat");
    if (roomName) {
      // db stuff
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  console.log("lastmessages",lastmessages);
  return !addNewChat ? (
    <NavLink to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <FaUserCircle size={"1.5em"} color="#99A3A4" />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {/* <h2>Dev Room</h2> */}
          <p>
            {/* <i>last message...</i> */}
            {/* {lastmessages[0].message} */}
          </p>
        </div>
      </div>
    </NavLink>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
