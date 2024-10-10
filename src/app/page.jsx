import AnimeSlider from "@/components/AnimeList/AnimeSlider";
import AnimeList from "../components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/services/api-service";
import prisma from "@/services/prisma";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime")

  const springAnime = await getAnimeResponse("seasons/2024/spring")

  const airingAnime = await getAnimeResponse("top/anime", "filter=airing")

  const animeSlider = await getAnimeResponse("top/anime", "filter=airing&&limit=20") // limitnya bisa dihilangkan

  // let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  // recommendedAnime = reproduce(recommendedAnime, 16)

  
  // FILTER POPULAR ANIME
  const popularAnimes = await prisma.anime.findMany({
    where: { desc: "Popular" }
  });
  
  const popularIds = popularAnimes.map((anime) => {
    return typeof anime.anime_mal_id === 'string' ? parseInt(anime.anime_mal_id) : anime.anime_mal_id;
  });

  // FILTER SPRING ANIME
  const springAnimes = await prisma.anime.findMany({
    where: { desc: "Spring" }
  });

  const springIds = springAnimes.map((anime) => {
    return typeof anime.anime_mal_id === 'string' ? parseInt(anime.anime_mal_id) : anime.anime_mal_id;
  });

  // FILTER AIRING TODAY ANIME
  const airingAnimes = await prisma.anime.findMany({
    where: { desc: "Airing" }
  });

  const airingIds = airingAnimes.map((anime) => {
    return typeof anime.anime_mal_id === 'string' ? parseInt(anime.anime_mal_id) : anime.anime_mal_id;
  });

  
  return (
    <>
      <div className="">    
        {/* ANIME SLIDER */}
        <section className="pt-32">
          <AnimeSlider animeList={animeSlider} />
        </section>

        {/* LAYOUT CONTAINER */}
        <div className="flex flex-col gap-6 px-4 mb-8 md:flex-row">
          {/* LEFT SIDE (75%) */}
          <div className="w-full md:w-3/4">
            {/* ANIME SPRING 2024 */}
            <section>
              <Header title="Spring 2024 Series" />
              <AnimeList api={springAnime} titleValue={true} allowedIds={springIds}/>
            </section>

            {/* ANIME TERPOPULER */}
            <section>
              <Header title="Most Popular" linkTitle="See more" linkHref="/populer" />
              <AnimeList api={topAnime} titleValue={true} allowedIds={popularIds}/>
            </section>
          </div>

          {/* RIGHT SIDE (25%) */}
          <div className="w-full md:w-1/4">
            {/* ANIME AIRING TODAY */}
            <section>
              <Header title="Top Airing Today" />
              <AnimeList api={airingAnime} titleValue={true} verticalList={true} airing={true} allowedIds={airingIds}/>
            </section>
          </div>
        </div>
      </div>

      {/* ANIME REKOMENDASI */}
      {/* <section> 
        <Header title="Recommendation"/>     
        <AnimeList api={recommendedAnime} titleValue={false}/>
      </section> */}
    </>
  );
};

export default Page
