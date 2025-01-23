"use client";

import {
  Code,
  Image,
  LayoutDashboard,
  MessageSquare,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import useSWR from "swr";

const SideBar = () => {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data.count;
  };

  const { data: count } = useSWR("/api/getApiCount", fetcher);

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
      label: "Image Generation",
      icon: Image,
      href: "/image",
      color: "text-pink-700",
    },
  ];

  const pathName = usePathname();

  return (
    <div className="fixed left-0 top-0 bottom-0 h-full w-52 md:w-72 bg-background text-text">
      <h1 className="text-3xl p-4 font-bold absolute">
        AI Platform
      </h1>
      <div className="absolute top-32 w-full flex flex-col">
        {routes.map((r) => (
          <Link
            className="flex justify-center w-full flex-col items-start"
            href={r.href}
            key={r.href}
          >
            <div
              className={`flex ${
                pathName === r.href ? "bg-white/10" : ""
              } justify-start items-center py-4 px-4 hover:bg-white/10 transition-all w-full gap-2 text-sm`}
            >
              <r.icon className={`${r.color!}`} />
              <p>{r.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-secondary-btn-text bg-secondary-btn rounded-r-md border-2 border-color w-full absolute bottom-10 flex flex-col justify-center items-center p-5">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="whitespace-nowrap">{count} / 3 Free Generations</p>
          <Progress
            className="h-3"
            value={(count! / 3) * 100}
          />
        </div>
        <Button variant={"premium"} className="mt-4 cursor-not-allowed">
          <Zap fill="white" />
          Upgrade
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
