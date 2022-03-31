import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import { useStateValue, StateProvider } from "./StateProvider";

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <center>
          <Login />
        </center>
      ) : (
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
