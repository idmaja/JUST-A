import prisma from '@/services/prisma';
import { authUserSession } from '@/services/auth-service';

export async function GET(req, { params }) {
  const user = await authUserSession();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const userDb = await prisma.user.findUnique({
    where: { email: user.email },
  });
  const { id } = params;
  const userId = userDb.id;

  try {
    const reaction = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: { userId, commentId: id },
      },
    });
    return Response.json({ reaction: reaction ? reaction.type : null }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
