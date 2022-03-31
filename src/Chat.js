import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Chat.css";
import {
  MdSearch,
  MdOutlineAttachment,
  MdMoreVert,
  MdInsertEmoticon,
  MdMic,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import * as firebase from "firebase";
import moment from "moment";
function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setroomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setroomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      id: new Date().getTime().toString(),
      message: input,
      name: user.displayName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  console.log("messages", messages);

  return (
    <div className="chat">
      <div className="chat__header">
        <FaUserCircle size={"1.5em"} color="#99A3A4" />
        <div className="chat__header__info">
          <h2>{roomName}</h2>
          <p>
            last seen{" "}
            {
              // new Date(messages[messages.length - 1].timestamp.toDate()).toUTCString()
              // messages[messages.length - 1].timeStamp.toDate().toUTCString()
            }
          </p>
        </div>
        <div className="chat__header__right">
          <MdSearch color="#99A3A4" />
          <MdOutlineAttachment color="#99A3A4" />
          <MdMoreVert color="#99A3A4" />
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, i) => (
          <p
            key={message.id}
            className={`chat__message  ${
              message.name === user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {message.timeStamp &&
                moment(
                  new Date(message.timeStamp.toDate()).toUTCString()
                ).fromNow()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <MdInsertEmoticon color="#99A3A4" />
        <form>
          <input
            type="text"
            placeholder="Start typing a message"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <MdMic color="#99A3A4" />
      </div>
    </div>
  );
}

export default Chat;
