import DashBoard from "@/components/DashBoard";
import { auth } from "@/providers/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session: any = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="md:pl-72 w-full">
      <DashBoard />
    </div>
  );
};

export default page;
