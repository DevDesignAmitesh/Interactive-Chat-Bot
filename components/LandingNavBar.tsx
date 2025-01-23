import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const LandingNavBar = async () => {
  return (
    <div className="dark absolute top-0 w-full p-5 sm:px-10 md:px-20 flex justify-between items-center">
      <h1 className="text-2xl font-bold">AI Platform</h1>
      <Link href="/auth">
        <Button className="bg-secondary-btn text-secondary-btn-text" >Get Started</Button>
      </Link>
    </div>
  );
};

export default LandingNavBar;
