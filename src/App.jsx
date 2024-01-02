import React from "react";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  console.log("home");
  return <p>Home</p>;
};

const About = () => {
  console.log("About");
  return <p>About</p>;
};
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
