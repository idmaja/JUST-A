import prisma from '@/services/prisma';
import { revalidatePath } from 'next/cache';
import { authUserSession } from '@/services/auth-service';

export async function POST(req, { params }) {
  const user = await authUserSession();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const userDb = await prisma.user.findUnique({
    where: { email: user.email },
  });
  const { id } = params;
  const userId = userDb.id;

  try {
    const existingReaction = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: { userId, commentId: id },
      },
    });

    // Jika sudah dislike, tidak melakukan apa-apa
    if (existingReaction?.type === 'DISLIKE') {
      return Response.json({ message: 'Already disliked' }, { status: 400 });
    }

    // Jika sebelumnya like, hapus like dan decrement likes
    if (existingReaction?.type === 'LIKE') {
      await prisma.commentLike.delete({ where: { id: existingReaction.id } });
      await prisma.comment.update({
        where: { id },
        data: { likes: { decrement: 1 } },
      });
    }

    // Tambahkan dislike baru
    await prisma.commentLike.create({
      data: { userId, commentId: id, type: 'DISLIKE' },
    });
    await prisma.comment.update({
      where: { id },
      data: { dislikes: { increment: 1 } },
    });

    revalidatePath(`/anime/${id}`);
    return Response.json({ message: 'Disliked successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
