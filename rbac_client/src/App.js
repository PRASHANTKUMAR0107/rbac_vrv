import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navbar";
import Users from "./webpages/Users";
import Roles from "./webpages/Roles";
import './App.css';

function App() {
  return (
    <Router>
      <div className="lg:flex md:flex md:flex-row-reverse bg-gray-700">
        <Sidebar />
        <div className="flex-grow h-screen overflow-scroll scrollbar-hide">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

