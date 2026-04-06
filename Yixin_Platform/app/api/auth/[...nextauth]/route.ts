// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth/authOptions";

const handler = NextAuth(authOptions);

// Next.js App Router API Route 需要導出 GET 和 POST
export { handler as GET, handler as POST };