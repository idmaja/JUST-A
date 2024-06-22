import AnimeList from "../components/AnimeList"
import Header from "@/components/AnimeList/Header"
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/services/api-service";
import dynamic from "next/dynamic";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=16")
  let recommendedAnime = await getNestedAnimeResponse("recommendations/anime", "entry")
  recommendedAnime = reproduce(recommendedAnime, 16)

  // const scrollTop = () => {
  //   window.scrollTo({
  //     behavior: "smooth",
  //     top: 0
  //   });
  // };

  // // Define scrollTop as a dynamic client component
  // const ScrollTopButton = dynamic(() => import('@/components/Utilities/ScrollTopButton'), { ssr: false });

  return (
    <>
      {/* ANIME TERPOPULER */}
      <section> 
        <Header title="Paling Populer" linkTitle="See more" linkHref="/populer"/>     
        <AnimeList api={topAnime} titleValue={true}/>
      </section>

      {/* ANIME REKOMENDASI */}
      <section> 
        <Header title="Rekomendasi"/>     
        <AnimeList api={recommendedAnime} titleValue={false}/>
      </section>
    </>
  );
};

export default Page
