"use client";

import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import { Button } from "./ui/button";

const LandingHero = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="flex flex-col text-[40px] font-bold text-center justify-center items-center">
        <h1>The Best Ai Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <Typewriter
            options={{
              strings: ["Chat Bot.", "Code Generation."],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <p className="text-zinc-500 text-[13px]">
        Create content using AI 10x faster.
      </p>
      <Link href="/auth">
        <Button className="mt-4" variant={"premium"}>
          Start Generating For Free.
        </Button>
      </Link>
      <p className="text-zinc-500 mt-3 text-[13px]">
        No credit card required.
      </p>
    </div>
  );
};

export default LandingHero;
