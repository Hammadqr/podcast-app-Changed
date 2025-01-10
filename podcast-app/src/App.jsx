// import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import PodcastPage from "./components/Browse";
import TopCharts from "./components/TopCharts"
import MyProfile from "./components/Profile";
import TopBar from "./components/TopBar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Add a route for the root path */}
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/PodcastPage" element={<PodcastPage/>} />
        <Route path="/TopCharts" element={<TopCharts/>} />
        <Route path="/MyProfile" element={<MyProfile/>} />
        <Route path="/TopBar" element={<TopBar/>} />
      </Routes>
    </Router>
  );
}

export default App;
