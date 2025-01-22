import LandingHero from "@/components/LandingHero";
import LandingNavBar from "@/components/LandingNavBar";
import React from "react";

const page = () => {
  return (
    <main className="w-full text-white relative flex justify-center h-screen bg-[#121824]">
      <LandingNavBar />
      <LandingHero />
    </main>
  );
};

export default page;
