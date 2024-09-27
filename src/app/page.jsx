import AnimeSlider from "@/components/AnimeList/AnimeSlider";
import AnimeList from "../components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/services/api-service";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=16")
  const animeSlider = await getAnimeResponse("top/anime", "limit=8")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  recommendedAnime = reproduce(recommendedAnime, 16)

  return (
    <>
      {/* ANIME SLIDER */}
      <section>
        <AnimeSlider animeList={animeSlider} />
      </section>

      {/* ANIME TERPOPULER */}
      <section> 
        <Header title="Most Popular" linkTitle="See more" linkHref="/populer"/>     
        <AnimeList api={topAnime} titleValue={true}/>
      </section>

      {/* ANIME REKOMENDASI */}
      <section> 
        <Header title="Recommendation"/>     
        <AnimeList api={recommendedAnime} titleValue={false}/>
      </section>
    </>
  );
};

export default Page
