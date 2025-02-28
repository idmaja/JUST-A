"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignIn, SignOut, User } from "@phosphor-icons/react/dist/ssr";

const UserActionButtonClient = ({ user }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const actionURL = user ? "/auth/signout" : "/auth/signin";
  const actionIcon = user ? (
    <SignOut size={20} className="text-color-red group-hover:text-white" weight="bold" alt="Sign out" />
  ) : (
    <SignIn size={20} className="text-color-yellow" weight="bold" alt="Sign in" />
  );
  const actionLabel = user ? "Sign Out" : "Sign In";

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      {user ? (
        <button
          onClick={handleToggle}
          className="flex items-center p-1 bg-color-dark text-color-primary hover:bg-color-secondary rounded-3xl"
        >
          <Image
            src={user?.image || "/default-user-profile.png"}
            alt="Dashboard"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>
      ) : (
        // <button
        //   onClick={handleToggle}
        //   className="inline-block px-2 py-1 text-2xl transition-all rounded-3xl bg-color-hover hover:bg-color-secondary"
        // >
        //   Sign In
        // </button>
          <Link
            href="/auth/signin"
            className="flex items-center gap-2 px-4 py-2 text-2xl transition-all rounded-3xl bg-color-secondary hover:bg-color-yellow"
            onClick={() => setIsOpen(false)}
          >
            <SignIn size={20} className="text-color-hover" weight="bold" alt="Sign in" />
            <span className="text-base">Sign In</span>
        </Link>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 w-56 mt-2 text-black bg-white rounded shadow-lg">
          {user && (
            <Link
              href="/users/dashboard"
              className="flex items-center gap-2 px-4 py-2 hover:bg-color-blue"
              onClick={() => setIsOpen(false)}
            >
              <User size={20} weight="bold" />
              <span className="text-base">Dashboard</span>
            </Link>
          )}
          <Link
            href={actionURL}
            className="flex items-center gap-2 px-4 py-2 hover:bg-red-600 hover:text-white group"
            onClick={() => setIsOpen(false)}
          >
            {actionIcon}
            <span className="text-base">{actionLabel}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserActionButtonClient;
