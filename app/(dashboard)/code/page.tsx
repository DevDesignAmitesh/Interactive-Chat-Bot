import CodePage from "@/components/Code";
import { auth } from "@/providers/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session: any = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }
  return <CodePage />;
};

export default page;
