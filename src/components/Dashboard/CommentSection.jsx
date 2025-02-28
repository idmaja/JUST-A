"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CommentDelete from "../AnimeList/CommentDelete";

const CommentSection = ({ comments }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
        <div className='flex items-center justify-center w-4 h-4 custom-loader'></div>
    ) 
  }

  return (
    <div className="space-y-4">
        {comments.map((comment) => (
        <div
            key={comment.id}
            className="relative w-auto p-4 bg-white rounded shadow-sm text-color-dark"
        >
            <Link href={`/anime/${comment.anime_mal_id}`} className="block">
                <p className="text-sm font-semibold text-gray-700">
                    {comment.anime_title}
                </p>
                <p className="italic text-gray-600">{comment.comment}</p>
            </Link>
            
            {/* Jika ingin tombol delete, uncomment berikut: */}
            <div className="absolute top-4 right-4">
                <CommentDelete commentId={comment.id} />
            </div>
        </div>
        ))}
    </div>
  );
};

export default CommentSection;
