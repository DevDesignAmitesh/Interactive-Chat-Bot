import LandingHero from "@/components/LandingHero";
import LandingNavBar from "@/components/LandingNavBar";
import React from "react";

const page = () => {
  return (
    <main className="dark w-full bg-background text-text relative flex justify-center h-screen ">
      <LandingNavBar />
      <LandingHero />
    </main>
  );
};

export default page;
