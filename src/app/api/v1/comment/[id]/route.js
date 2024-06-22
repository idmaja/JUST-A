import prisma from "@/services/prisma";

// Fungsi untuk menangani DELETE request
export async function DELETE(req, { params }) {
  const { id } = params; // Mengambil id dari params

  try {
    await prisma.comment.delete({
      where: { id: id },
    });
    return new Response(JSON.stringify({ status: 200, isDeleted: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return new Response(JSON.stringify({ status: 500, isDeleted: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Fungsi untuk menangani PUT request
export async function PUT(req, { params }) {
  const { id } = params; // Mengambil id dari params
  const { comment } = await req.json(); // Mengambil comment dari request body

  try {
    await prisma.comment.update({
      where: { id: id },
      data: { comment },
    });
    return new Response(JSON.stringify({ status: 200, isUpdated: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response(JSON.stringify({ status: 500, isUpdated: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Fungsi untuk menangani method yang tidak diizinkan
export async function handler(request, response) {
  const { method } = request;

  response.setHeader('Allow', ['DELETE']);
  return response.status(405).end(`Method ${method} Not Allowed`);
}
