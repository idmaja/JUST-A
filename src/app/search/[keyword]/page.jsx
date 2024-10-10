"use client"

import { getAnimeResponse } from "@/services/api-service";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header"
import Pagination from "@/components/Utilities/Pagination";
import React, { useEffect, useState } from 'react'

const Page = async ({ params }) => {
  const { keyword } = params

  const [page, setPage] = useState(1)
  const [setAnime, setSetAnime] = useState([])

  const decodedKeyword = decodeURI(keyword)
  const fetchData = async() => {
    const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}&&page=${page}&&limit=16`)
    setSetAnime(searchAnime)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  return (
    <>
      <section className="pt-14">
        <Header title={`Pencarian untuk : ${decodedKeyword}`}/>     
        <AnimeList api={setAnime} titleValue={true}/>
        <Pagination page={page} lastPage={setAnime.pagination?.last_visible_page} setPage={setPage}/>
      </section>
    </>
  );
};

export default Page
