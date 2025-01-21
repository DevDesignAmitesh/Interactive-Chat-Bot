import { auth } from "@/providers/auth";
import NextAuth from "next-auth";

const handler = NextAuth(auth);

export { handler as POST, handler as GET };
