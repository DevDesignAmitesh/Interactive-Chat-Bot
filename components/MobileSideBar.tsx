"use client";

import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import SideBar from "./SideBar";

const MobileSideBar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <SheetTitle>
            <GiHamburgerMenu size={20} />
          </SheetTitle>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="h-full bg-background w-72 md:w-96 text-text"
        >
          <SideBar />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSideBar;
