import AnimeSlider from "@/components/AnimeList/AnimeSlider";
import AnimeList from "../components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/services/api-service";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=16")

  const springAnime = await getAnimeResponse("seasons/2024/spring", "limit=16")

  const airingAnime = await getAnimeResponse("top/anime", "filter=airing&&limit=8")

  const animeSlider = await getAnimeResponse("top/anime", "filter=airing&&limit=8")

  // let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  // recommendedAnime = reproduce(recommendedAnime, 16)

  return (
    <>
      {/* ANIME SLIDER */}
      <section>
        <AnimeSlider animeList={animeSlider} />
      </section>

      {/* LAYOUT CONTAINER */}
      <div className="flex flex-col gap-6 px-4 md:flex-row">
        {/* LEFT SIDE (75%) */}
        <div className="w-full md:w-3/4">
          {/* ANIME SPRING 2024 */}
          <section>
            <Header title="Spring 2024 Series" />
            <AnimeList api={springAnime} titleValue={true} />
          </section>

          {/* ANIME TERPOPULER */}
          <section>
            <Header title="Most Popular" linkTitle="See more" linkHref="/populer" />
            <AnimeList api={topAnime} titleValue={true} />
          </section>
        </div>

        {/* RIGHT SIDE (25%) */}
        <div className="w-full md:w-1/4">
          {/* ANIME AIRING TODAY */}
          <section>
            <Header title="Top Airing Today" />
            <AnimeList api={airingAnime} titleValue={true} verticalList={true} airing={true}/>
          </section>
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
