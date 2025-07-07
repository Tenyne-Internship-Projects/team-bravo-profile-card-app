import React from "react";
import Onboarding from "./Onboarding";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <Onboarding />
      </main>
    </div>
  );
};

export default Home;
