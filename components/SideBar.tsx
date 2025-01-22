"use client";

import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-700",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  const pathName = usePathname();

  return (
    <div className="fixed left-0 top-0 bottom-0 h-full w-52 md:w-72 bg-gray-900">
      <h1 className="text-3xl p-4 font-bold absolute text-white">
        AI Platform
      </h1>
      <div className="absolute top-32 w-full flex flex-col">
        {routes.map((r) => (
          <Link
            className="flex justify-center w-full flex-col text-white items-start"
            href={r.href}
            key={r.href}
          >
            <div
              className={`flex ${
                pathName === r.href ? "bg-white/10 text-white" : "text-gray-400"
              } justify-start items-center py-2 px-4 hover:bg-white/10 mb-2 transition-all w-full gap-2 text-sm`}
            >
              <r.icon className={`${r.color!}`} />
              <p>{r.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
