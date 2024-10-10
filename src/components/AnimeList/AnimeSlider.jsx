"use client";

import React, { useState, useEffect } from 'react';
import './AnimeSlider.css';
import Image from 'next/image';
import Link from 'next/link';

const AnimeSlider = ({ animeList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedAnimeList, setDisplayedAnimeList] = useState([]);

  // Fungsi untuk merandom subset anime dari list yang diberikan
  const getRandomSubset = (list, num) => {
    const shuffled = list
      .map((item) => ({ ...item, sort: Math.random() })) // Tambahkan properti 'sort' acak pada setiap anime
      .sort((a, b) => a.sort - b.sort); // Urutkan berdasarkan properti acak
    return shuffled.slice(0, num); // Ambil `num` elemen pertama setelah diacak
  };

  useEffect(() => {
    if (animeList?.data) {
      setDisplayedAnimeList(getRandomSubset(animeList.data, 10)); // Set anime acak dari API
    }
  }, [animeList]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);

    return () => clearInterval(interval);
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
            {/* Gambar diletakkan di bawah vignette */}
            <Image
              src={anime.trailer?.images?.maximum_image_url || anime.images.webp.large_image_url}
              alt={anime.title}
              className="anime-image"
              width={5000}
              height={5000}
              priority
            />
            <div className="mb-3 ml-2 anime-info md:text-sm sm:text-xs">
              <h2>{anime.title}</h2>
              <div className="anime-rating">⭐ {anime.score}</div>
              <p className="mb-5">{anime.genres.map((genre) => genre.name).join(', ')}</p>
              <Link
                href={`/anime/${anime.mal_id}`}
                className="anime-info-button transition-all py-2.5 px-5 me-2 mb-5 sm:text-sm md:text-sm font-medium text-color-primary
                  rounded-full border border-color-secondary bg-color-secondary hover:bg-color-yellow hover:text-color-primary"
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
      <button className="transition-all prev" onClick={handlePrevClick}>❮</button>
      <button className="transition-all next" onClick={handleNextClick}>❯</button>
    </div>
  );
};

export default AnimeSlider;
