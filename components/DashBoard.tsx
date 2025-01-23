"use client";

import {
  ArrowRight,
  Code,
  Image,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashBoard = () => {
  const routes = [
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-700",
      bg: "bg-green-700/10",
    },
    {
      label: "Image Generation",
      icon: Image,
      href: "/image",
      color: "text-pink-700",
      bg: "bg-pink-700/10",
    },
  ];

  const router = useRouter();
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col gap-4 w-full md:px-24 px-10">
        <div className="flex w-full flex-col gap-1 md:gap-2 justify-center items-center">
          <h1 className="text-3xl text-center font-bold capitalize">
            explore the power of aI
          </h1>
          <p className="text-[13px] md:text-[15px] text-center text-gray-400">
            Chat with the smartest AI - Experience the power of AI
          </p>
        </div>
        <div className="flex justify-center gap-5 w-full items-center flex-col">
          {routes.map((r) => (
            <div
              key={r.href}
              onClick={() => router.push(r.href)}
              className="flex w-full py-2 px-4 cursor-pointer border-color border rounded-md hover:shadow-lg justify-between items-center"
            >
              <div className="flex justify-center items-center gap-4">
                <r.icon
                  size={35}
                  className={`${r.color} rounded-md p-2 ${r.bg}`}
                />
                <p className="font-semibold">{r.label}</p>
              </div>
              <ArrowRight />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
