import prisma from "@/services/prisma";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.user.delete({ where: { id } });
    return new Response(JSON.stringify({ status: 200, isDeleted: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: 500, isDeleted: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { username, role } = await req.json();
  
    try {
      await prisma.user.update({
        where: { id },
        data: { username, role },
      });
  
      return new Response(JSON.stringify({ status: 200, isUpdated: true }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ status: 500, isUpdated: false }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  