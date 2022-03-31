import React, { useState, useEffect } from "react";

import { FaUserCircle } from "react-icons/fa";
import { MdDonutLarge, MdMoreVert, MdSearch } from "react-icons/md";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import SidebarChat from "./SidebarChat";
import db from "./firebase";

import "./Sidebar.css";

function Sidebar() {
  // debugger;
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    // console.log("rooms", rooms);
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unsubscribe();
    };
  },[]);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <FaUserCircle size={"1.5em"} color="#99A3A4" />
        <div className="sidebar__headerRight">
          <MdDonutLarge color="#99A3A4" />
          <BsFillChatLeftTextFill color="#99A3A4" />
          <MdMoreVert color="#99A3A4" />
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <MdSearch color="#99A3A4" />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {/* <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/> */}
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
