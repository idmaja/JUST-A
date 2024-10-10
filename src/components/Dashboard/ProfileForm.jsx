"use client"; // Enables client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";

const ProfileForm = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  console.log('nama: ', username);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
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
      <Header title={"UPDATE USERNAME"} />
      <div className="flex items-start justify-center min-h-screen">
        <div className="w-full max-w-md p-8 mt-10 rounded-lg shadow-lg bg-slate-900">
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

      {/* Modal for feedback */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="max-w-sm p-8 mx-auto mt-16 bg-white rounded-lg shadow-lg md:mt-20"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-center text-gray-500">
                {message}
              </h2>
              <p className="text-center text-color-secondary">
                {message === "Profile updated successfully!" 
                  ? "Your username has been updated." 
                  : "Something went wrong. Please try again."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProfileForm;
