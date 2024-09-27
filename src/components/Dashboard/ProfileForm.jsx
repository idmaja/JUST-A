"use client"; // Enables client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "./Header";

const ProfileForm = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  console.log('nama: ',username)
  const [message, setMessage] = useState("");
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
    
    if (result.isUpdated) {
      setMessage("Profile updated successfully!");
      router.refresh(); // Refresh the page data
    } else {
      setMessage("Failed to update profile.");
    }
  };

  return (
    <section className="w-full px-4 mt-4">
      <Header title={"UPDATE USERNAME"}/>
      <div className="flex items-start justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 mt-10 bg-white rounded-lg shadow-lg">
          {/* <h2 className="mb-6 text-2xl font-semibold text-center text-color-secondary">
            Update Username
          </h2> */}
          <form onSubmit={handleUpdate} className="space-y-6 text-color-primary">
            <div>
              <motion.input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                whileFocus={{ scale: 1.05 }}
                className="block w-full p-3 mt-1 text-lg font-bold border border-gray-300 rounded-lg text-color-dark focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 transition-colors rounded bg-color-secondary hover:bg-color-primary hover:text-color-dark"
              >
                Update
              </button>
            {/* {message && (
              <p
                className={`mt-4 text-center font-medium ${
                  result.isUpdated ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )} */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
