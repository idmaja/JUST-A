"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CollectionSection = ({ collection }) => {
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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {collection.map((item) => (
        <Link
            key={item.id}
            href={`/anime/${item.anime_mal_id}`}
            className="relative transition-all cursor-pointer hover:text-color-secondary"
        >
            <Image
            src={item.anime_image || "/no-image.jpg"}
            alt={item.anime_image || "No Image"}
            width={300}
            height={400}
            className="object-cover w-full h-64 rounded"
            />
            <h3 className="pt-1 font-bold text-md md:text-lg">
            {item.anime_title}
            </h3>
        </Link>
        ))}
    </div>
  );
};

export default CollectionSection;
