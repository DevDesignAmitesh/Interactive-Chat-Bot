"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./SideBar";

const MobileSideBar = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <GiHamburgerMenu size={20} />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="h-full bg-gray-900 w-72 md:w-96 text-white"
        >
          <SideBar />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSideBar;
