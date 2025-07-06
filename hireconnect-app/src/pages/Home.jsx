import React from "react";
import Onboarding from "./Onboarding";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-[#f9f7fb] flex flex-col items-center">
      <main className="pt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <Onboarding />
      </main>
    </div>
  );
};

export default Home;
