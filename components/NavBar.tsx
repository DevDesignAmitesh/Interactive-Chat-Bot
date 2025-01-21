"use client";

import React from "react";
import MobileSideBar from "./MobileSideBar";
import UserProfile from "./UserProfile";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const NavBar = () => {
  return (
    <div className="flex w-full p-5 justify-between items-start">
      <MobileSideBar />
      <div className="flex justify-center items-center gap-4">
        <Button onClick={() => signOut()}>Log out</Button>
        <UserProfile />
      </div>
    </div>
  );
};

export default NavBar;
