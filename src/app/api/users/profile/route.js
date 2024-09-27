import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/services/prisma";

export async function PUT(req) {
  const session = await getServerSession(authOption); // Use authOptions for session retrieval
  
  if (!session?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const { username } = await req.json();

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { username },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}
