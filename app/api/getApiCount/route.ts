import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { auth } from "@/providers/auth";
import { prisma } from "@/prisma/src";

export async function GET(req: NextRequest) {
  try {
    const session: any = await getServerSession(auth);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 400 });
    }

    const user = await prisma.userApiLimit.findUnique({
      where: {
        email,
      },
    });

    return NextResponse.json({ count: user?.count || 0 });
  } catch (error) {
    console.error("Error fetching API count:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
