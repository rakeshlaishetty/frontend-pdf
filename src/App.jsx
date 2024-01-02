import React from "react";
import { Routes, Route, Link } from "react-router-dom";

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
     <>
     <div>
        <Link to={"/about"}>About</Link>
        <Link to={"/"}>home</Link>
      </div>
    <Routes>
      <Route path="/"  element={<Navigate to="/auth" replace />} />
      <Route path="/about" element={<About />} />
    </Routes>
     </>
  );
}
