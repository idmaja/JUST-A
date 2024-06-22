import { Star } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image"
import Link from "next/link"

const AnimeList = ({ api, titleValue }) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-8 sm:grid-cols-3">
      {api.data?.map((anime, index) => {
          return (
            <Link href={`/anime/${anime.mal_id}`} 
            className="transition-all cursor-pointer text-color-primary hover:text-color-secondary"
            key={index}
            >
              <Image src={anime.images.webp.image_url} alt="..." width={500} height={500} className="object-cover w-full h-64 rounded"/>
              {titleValue && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">               
                    <Star size={10} weight="light" className="mr-2"/>
                    {anime.score}
                  </div>
                  {anime.type}
                </div>
              )}
              <h3 className="pt-1 font-bold md:text-xl text-md">{anime.title}</h3>
            </Link>
          )
      })}       
    </div>
  );
};

export default AnimeList
