import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  console.log("hello world");
  return <h2 className="text-red-500">Hello Home</h2>;
};

const AboutUs = () => {
  return <h2 className="text-red-500">AboutUs</h2>;
};

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
};

export default App;
