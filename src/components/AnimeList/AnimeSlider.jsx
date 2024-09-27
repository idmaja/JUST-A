"use client";

import React, { useState, useEffect } from 'react';
import './AnimeSlider.css'; // Adjusted CSS for better UI
import Image from 'next/image';
import Link from 'next/link';

const AnimeSlider = ({ animeList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedAnimeList, setDisplayedAnimeList] = useState([]);

  // Randomize the animeList only on the client side after the component mounts
  useEffect(() => {
    if (animeList?.data) {
      const getRandomSubset = (list, num) => {
        const shuffled = list.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };
      setDisplayedAnimeList(getRandomSubset(animeList.data, 8));
    }
  }, [animeList]);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? displayedAnimeList.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = currentIndex === displayedAnimeList.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="anime-slider">
      <div className="anime-slider-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {displayedAnimeList.map((anime) => (
          <div className="anime-slide" key={anime.mal_id}>
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="anime-image"
              width={2000}
              height={2000}
            />
            <div className="anime-info">
              <h2>{anime.title}</h2>
              <div className="anime-rating">⭐ {anime.score}</div>
              <p className='mb-5'>{anime.genres.map((genre) => genre.name).join(', ')}</p>
              <Link
                href={`/anime/${anime.mal_id}`}
                className="transition-all py-2.5 px-5 me-2 mb-5 text-sm font-medium text-color-blue focus:outline-none bg-white 
                  rounded-full border border-color-secondary hover:bg-color-yellow hover:text-color-primary focus:z-10 focus:ring-4"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="anime-pagination">
        {displayedAnimeList.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      {/* Navigation buttons */}
      <button className="prev" onClick={handlePrevClick}>❮</button>
      <button className="next" onClick={handleNextClick}>❯</button>
    </div>
  );
};

export default AnimeSlider;
