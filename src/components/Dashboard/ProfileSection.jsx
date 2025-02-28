"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ProfileSection = ({ user, dbUser }) => {
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
    <>
        <Image
            src={user?.image || "/default-user-profile.png"}
            alt="Profile Picture"
            width={120}
            height={120}
            className="object-cover mb-4 rounded-full"
        />
        <h5 className="text-xl font-bold text-center">{dbUser?.username}</h5>
        <p className="mb-2 text-sm text-color-secondary">{dbUser?.email}</p>
        <Link
            href="/users/profile"
            className="underline transition-all hover:text-color-secondary"
        >
            Change Username?
        </Link>
    </>
  );
};

export default ProfileSection;
