"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const page = () => {
  return (
    <div className="dark flex bg-background text-text w-full h-screen justify-center items-center">
      <Button className="bg-background text-text" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        <p>Sign in with google</p>
        <FcGoogle />
      </Button>
    </div>
  );
};

export default page;
