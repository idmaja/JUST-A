"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SignIn = ({ providers }) => {
  const images = [
    'https://img.youtube.com/vi/tShYCQALuH8/maxresdefault.jpg',
    'https://img.youtube.com/vi/--IcmZkvL0Q/maxresdefault.jpg',
    'https://img.youtube.com/vi/27OZc-ku6is/maxresdefault.jpg',
    'https://img.youtube.com/vi/OfSaJb5OOPA/maxresdefault.jpg',
    'https://img.youtube.com/vi/Tf31dGdlWxE/maxresdefault.jpg',
    'https://img.youtube.com/vi/kM2m7GcF6W0/maxresdefault.jpg'
  ]; 

  const [currentImage, setCurrentImage] = useState(0); 
  const [showImage, setShowImage] = useState(true);    

  const providerLogos = {
    google: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA',
    github: '../github-mark.svg' 
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowImage(false);  // Trigger fade-out

      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);  
        setShowImage(true);  // Trigger fade-in
      }, 500); 
    }, 3000);  
    return () => clearInterval(intervalId); 
  }, [images.length]);

  return (
    <div className="relative flex items-center justify-center min-h-screen text-color-primary">
      <AnimatePresence mode="wait">
        {showImage && (
          <motion.div
            key={currentImage}
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} 
          />
        )}
      </AnimatePresence>
        
      <div className="absolute inset-0 bg-black bg-opacity-20 filter backdrop-blur-md"></div>
      <div className="relative z-10 w-full max-w-sm p-10 rounded-lg shadow-xl bg-color-primary">
        <div className="flex flex-col items-center mb-6">
          <Image src="/just-a-logo.svg" alt="Logo" width={100} height={100} className="mb-4" />
          <h2 className="text-2xl font-bold text-center text-color-dark">Sign in to Your Account</h2>
        </div>
        <div className="space-y-4">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <motion.button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                whileHover={{ scale: 1.02 }}   
                whileTap={{ scale: 0.95 }} 
                transition={{ duration: 0.05 }}    
                className="flex flex-col items-center w-full px-4 py-2 transition-all border-2 rounded-lg text-color-dark border-color-dark hover:text-color-secondary hover:bg-transparent"
              >
                <Image
                  src={providerLogos[provider.id]}  
                  alt={`${provider.name} logo`}
                  width={24}
                  height={24}
                  className="mr-3"
                />
                Sign in with {provider.name}
              </motion.button>
            </div>
          ))}
        </div>
        {/* <p className="mt-6 text-sm text-center text-gray-500">New here? <a href="/register" className="text-color-secondary hover:underline">Create an account</a></p> */}
      </div>
    </div>
  );
};

export default SignIn;
