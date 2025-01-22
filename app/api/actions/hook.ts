"use server";

import { prisma } from "@/prisma/src";
import { auth } from "@/providers/auth";
import { getServerSession } from "next-auth";

export async function increaseApiLimit(): Promise<void> {
  const session: any = await getServerSession(auth);

  if (!session) return;

  const email = session?.user?.email;
  if (!email) return;

  const user = await prisma.userApiLimit.findUnique({ where: { email } });

  if (user) {
    await prisma.userApiLimit.update({
      where: { email },
      data: { count: user.count + 1 },
    });
  } else {
    await prisma.userApiLimit.create({ data: { email, count: 1 } });
  }
}

export async function checkApiLimit(): Promise<boolean | void> {
  const session: any = await getServerSession(auth);
  if (!session) return;

  const email = session?.user?.email;
  if (!email) return;

  const user = await prisma.userApiLimit.findUnique({ where: { email } });
  return user?.count === 3 || false;
}
