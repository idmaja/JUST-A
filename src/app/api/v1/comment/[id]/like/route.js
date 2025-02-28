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

    // Jika sudah like, tidak melakukan apa-apa
    if (existingReaction?.type === 'LIKE') {
      return Response.json({ message: 'Already liked' }, { status: 400 });
    }

    // Jika sebelumnya dislike, hapus dislike dan decrement dislikes
    if (existingReaction?.type === 'DISLIKE') {
      await prisma.commentLike.delete({ where: { id: existingReaction.id } });
      await prisma.comment.update({
        where: { id },
        data: { dislikes: { decrement: 1 } },
      });
    }

    // Tambahkan like baru
    await prisma.commentLike.create({
      data: { userId, commentId: id, type: 'LIKE' },
    });
    await prisma.comment.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    revalidatePath(`/anime/${id}`);
    return Response.json({ message: 'Liked successfully' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
