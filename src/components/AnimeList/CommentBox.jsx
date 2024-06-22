import prisma from '@/services/prisma'
import React from 'react'
import CommentDelete from './CommentDelete';
import { authUserSession } from '@/services/auth-service';

const CommentBox = async({anime_mal_id}) => {
  const user = await authUserSession()
  const comments = await prisma.comment.findMany({where: {anime_mal_id}});

  return (
    <div className="flex flex-col gap-4 pt-2 mb-4">
      {comments.map(comment => {
        const userCanDelete = user?.email == comment.user_email; // untuk username yang sama
        return (
          <div key={comment.id} className="p-4 rounded text-color-primary bg-color-accent outline-color-hover outline-1 outline-double">
              <div className="relative flex items-center">
                <div className="ml-2">
                  <p className="font-bold">{comment.username}</p>
                  <p>{comment.comment}</p>
                </div>
                <div className="absolute ml-2 right-2">
                  {userCanDelete && <CommentDelete commentId={comment.id} />}
                </div>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export default CommentBox
