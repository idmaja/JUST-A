"use client";

import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import SuccessModal from "../Utilities/SuccessModal";

const LikeDislike = ({ commentId, initialLikes, initialDislikes, initialUserReaction = null }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState(initialUserReaction); // 'LIKE', 'DISLIKE', atau null
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Saat komponen pertama kali dirender, ambil status reaksi pengguna
  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const response = await fetch(`/api/v1/comment/${commentId}/reaction`);
        if (response.ok) {
          const data = await response.json();
          setUserReaction(data.reaction);
        }
      } catch (error) {
        console.error("Gagal fetch reaction:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReaction();
  }, [commentId]);

  // Bersihkan pesan modal setelah 3 detik
  useEffect(() => {
    if (modalMessage) {
      const timer = setTimeout(() => {
        setModalMessage(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [modalMessage]);

  const handleLike = async () => {
    if (userReaction === "LIKE") return;
    try {
      const response = await fetch(`/api/v1/comment/${commentId}/like`, { method: "POST" });
      const data = await response.json();
      if (response.status === 200) {
        // Jika sebelumnya dislike, kurangi jumlah dislike
        if (userReaction === "DISLIKE") {
          setDislikes(dislikes - 1);
        }
        setLikes(likes + 1);
        setUserReaction("LIKE");
      }
      // Tampilkan pesan modal (bisa "Liked successfully" atau "Already liked")
      setModalMessage(data.message);
    } catch (error) {
      setModalMessage("Terjadi kesalahan");
      console.error("Error pada handleLike:", error);
    }
  };

  const handleDislike = async () => {
    if (userReaction === "DISLIKE") return;
    try {
      const response = await fetch(`/api/v1/comment/${commentId}/dislike`, { method: "POST" });
      const data = await response.json();
      if (response.status === 200) {
        if (userReaction === "LIKE") {
          setLikes(likes - 1);
        }
        setDislikes(dislikes + 1);
        setUserReaction("DISLIKE");
      }
      // Tampilkan pesan modal (bisa "Disliked successfully" atau "Already disliked")
      setModalMessage(data.message);
    } catch (error) {
      setModalMessage("Terjadi kesalahan");
      console.error("Error pada handleDislike:", error);
    }
  };

  // Ubah gaya tombol berdasarkan status reaksi
  const likeButtonStyle = userReaction === 'LIKE' ? "text-green-400" : "text-blue-400 hover:text-blue-600";
  const dislikeButtonStyle = userReaction === 'DISLIKE' ? "text-green-400" : "text-red-400 hover:text-red-600";

  if (loading) {
    return (
      <div className='flex items-center justify-center w-1 h-1 custom-loader'></div>
    ) 
  }

  return (
    <div className="flex items-center gap-4 mt-2">
      {modalMessage && <SuccessModal message={modalMessage} />}
      <button 
        onClick={handleLike} 
        className={`flex items-center gap-1 ${likeButtonStyle}`}
        disabled={userReaction === 'LIKE'}  // Nonaktifkan tombol jika sudah like
      >
        <FaThumbsUp /> {likes}
      </button>
      <button 
        onClick={handleDislike} 
        className={`flex items-center gap-1 ${dislikeButtonStyle}`}
        disabled={userReaction === 'DISLIKE'}  // Nonaktifkan tombol jika sudah dislike
      >
        <FaThumbsDown /> {dislikes}
      </button>
    </div>
  );
};

export default LikeDislike;
