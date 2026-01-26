"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import SuccessModal from "../Utilities/SuccessModal";

const ProfileForm = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const result = await response.json();

    if (result.success) {
      setMessage("Profile updated successfully!");
      setShowModal(true); 
      setTimeout(() => {
        setShowModal(false); 
      }, 2400);
    
      setTimeout(() => {
        router.refresh(); 
      }, 2500);
    } else {
      setMessage("Failed to update profile.");
      setShowModal(true); 
      setTimeout(() => setShowModal(false), 2400); 
    }
  };

  return (
    <section className="w-full px-4 pt-10 mt-4 md:pt-24">
      <Header title={"ADD NEW USERNAME"} />
      <div className="flex items-start justify-center min-h-screen">
        <div className="w-full max-w-md p-8 mt-2 rounded-lg shadow-lg md:mt-10 bg-slate-900">
          <form onSubmit={handleUpdate} className="space-y-6 text-color-primary">
            <div>
              <motion.input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                whileFocus={{ scale: 1.03 }}
                className="block w-full p-3 mt-1 text-lg font-bold border border-gray-300 rounded-lg text-color-dark focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full transition-all py-2.5 px-5 me-2 mb-2 text-sm font-medium text-color-blue focus:outline-none bg-color-hover
                          rounded-lg hover:bg-color-yellow hover:text-color-primary"
            >
              Update
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <SuccessModal message="Update username successfully!" />
      )}

    </section>
  );
};

export default ProfileForm;
