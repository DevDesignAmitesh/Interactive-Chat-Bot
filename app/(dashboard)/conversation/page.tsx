import Conversation from "@/components/Conversation";
import { auth } from "@/providers/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session: any = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }
  return <Conversation />;
};

export default page;
