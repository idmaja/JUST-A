"use client";

import React, { useEffect } from "react";

const SuccessModal = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const modal = document.getElementById("success-modal");
      if (modal) modal.style.display = "none";
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="success-modal"
      style={{
        position: "fixed",
        bottom: "5%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        animation: "slideUp 1.5s",
        animationFillMode: "forwards",
        backgroundColor: "white",
        color: "black",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p>{message}</p>
      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          80% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
