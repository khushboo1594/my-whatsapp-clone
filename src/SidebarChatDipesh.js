import React, { useEffect, useState } from "react";
import "./sidebarchat.css";
import { Avatar } from "@mui/material";
import db from "../../firebase";
import { Link } from "react-router-dom";
const Sidebarchat = ({ addNewChat, id, name }) => {
  const [seed, setseed] = useState("");
  const [lastmessages, setlastmessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setlastmessages(snapshot.docs.map((doc) => doc.data()))
          
        );
    }
  }, [id]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomname = prompt("please enter name for a chat    ");
    if (roomname) {
      // do something DB
      db.collection("rooms").add({
        name: roomname,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p className="sidebarChat__info__latestmessage">
            {lastmessages[0]?.message}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
};

export default Sidebarchat;
