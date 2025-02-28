import prisma from '@/services/prisma';
import React from 'react';
import CommentDelete from './CommentDelete';
import { authUserSession } from '@/services/auth-service';
import FormatEmail from '../Utilities/FormatEmail';
import Image from 'next/image';
import LikeDislike from './LikeDislike';

const CommentBox = async ({ anime_mal_id }) => {
  const user = await authUserSession();
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">You must be logged in to view this page.</p>
      </div>
    );
  }
  const comments = await prisma.comment.findMany({
    where: { anime_mal_id },
    include: { user: true },
  });

  return (
    <div className="flex flex-col gap-4 pt-2 mb-12">
      {comments.map((comment) => {
        const userCanDelete = user?.email == comment.user_email;
        const formatEmail = FormatEmail(comment.user_email);
        const userProfileImage = comment.user?.image || '../default-user-profile.png';

        return (
          <div key={comment.id} className="flex gap-4 p-4 bg-gray-800 rounded-lg shadow-lg text-color-primary">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src={userProfileImage}
                alt={comment.username || 'User Profile'}
                width={50}
                height={50}
                className="object-cover rounded-full"
              />
            </div>

            {/* Comment Content */}
            <div className="flex-1">
              <div className="relative flex flex-col">
                <p className="mb-2 text-lg font-bold text-color-secondary">
                  {comment.username}
                  <span className="ml-2 text-xs font-thin text-white">({formatEmail})</span>
                </p>
                <p className="italic text-gray-200">{comment.comment}</p>

                {/* Like & Dislike Buttons */}
                {user && <LikeDislike commentId={comment.id} initialLikes={comment.likes} initialDislikes={comment.dislikes} />}

                {/* Delete Button */}
                <div className="absolute top-4 right-1">
                  {userCanDelete && <CommentDelete commentId={comment.id} />}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
