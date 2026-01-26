"use client";

import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import SuccessModal from "../Utilities/SuccessModal";

const LikeDislike = ({ commentId, initialLikes, initialDislikes, initialUserReaction = null }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState(initialUserReaction);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const response = await fetch(`/api/v1/comment/${commentId}/reaction`);
        if (response.ok) {
          const data = await response.json();
          setUserReaction(data.reaction);
        }
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };
    fetchReaction();
  }, [commentId]);


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

        if (userReaction === "DISLIKE") {
          setDislikes(dislikes - 1);
        }
        setLikes(likes + 1);
        setUserReaction("LIKE");
      }

      setModalMessage(data.message);
    } catch (error) {
      setModalMessage("Terjadi kesalahan");
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

      setModalMessage(data.message);
    } catch (error) {
      setModalMessage("Terjadi kesalahan");
    }
  };


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
        disabled={userReaction === 'LIKE'}
      >
        <FaThumbsUp /> {likes}
      </button>
      <button 
        onClick={handleDislike} 
        className={`flex items-center gap-1 ${dislikeButtonStyle}`}
        disabled={userReaction === 'DISLIKE'}
      >
        <FaThumbsDown /> {dislikes}
      </button>
    </div>
  );
};

export default LikeDislike;
