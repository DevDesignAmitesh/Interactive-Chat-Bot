"use client";

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DahBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <body className="w-full relative">
      <SessionProvider>
        <NavBar />
        {children}
        <div className="hidden md:block md:w-72 z-[80]">
          <SideBar />
        </div>
      </SessionProvider>
    </body>
  );
}
