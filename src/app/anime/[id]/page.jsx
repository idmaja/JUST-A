import { getAnimeResponse } from "@/services/api-service"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import Image from "next/image"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import { authUserSession } from "@/services/auth-service"
import prisma from "@/services/prisma"
import CommentInput from "@/components/AnimeList/CommentInput"
import CommentBox from "@/components/AnimeList/CommentBox"
import { Play, Star } from "@phosphor-icons/react/dist/ssr"

const Page = async({ params: { id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession()
    const collection = await prisma.collection.findFirst({
        where: { user_email: user?.email, anime_mal_id: id }
    })

    return (
        <div className="p-8 text-white bg-dark-900">
            <div className="flex items-center">
                <Play size={28} weight="fill" className="mr-2 text-color-secondary"/>
                <h1 className="text-2xl font-bold text-color-primary">Overview</h1>
            </div>
            <div className="flex gap-6">
                <Image
                    src={anime.data.images.webp.image_url}
                    alt={anime.data.title}
                    width={350}
                    height={350}
                    className="w-64 pt-3 rounded h-96"
                />  
                <div className="text-color-primary">
                    <h3 className="text-4xl font-bold">{anime.data.title} | {anime.data.title_japanese}</h3>
                    {/* <div className="mt-2 font-light">R - 17+ (violence & profanity)</div> */}
                    {anime.data.synopsis}
                    <div className="mt-6">
                        <p><strong>Type:</strong> {anime.data.type}</p>
                        <p><strong>Release:</strong> {anime.data.season} {anime.data.year}</p>
                        <p><strong>Status:</strong> {anime.data.status}</p>
                        <p><strong>Genre:</strong> {anime.data.genres.map(genre => genre.name).join(', ')}</p>
                        <p className="flex items-center">
                            <strong>Score:</strong>
                            <Star size={10} weight="fill" color="red" className="ml-2 mr-1" />
                            {anime.data.score}
                        </p>
                        <p><strong>Duration:</strong> {anime.data.duration}</p>
                    </div>
                    {/* <div className="mt-4">
                        {collection && user &&
                            <button className="px-4 py-2 mt-4 text-white bg-gray-700 rounded-lg">
                                Remove From Collection
                            </button>
                        }
                    </div> */}
                </div>
            </div>
            <div className="">
                <div className="flex items-center w-full pt-2">
                    {user &&
                        <CollectionButton anime_mal_id={id} user_email={user?.email} anime_image={anime.data.images.webp.image_url} anime_title={anime.data.title}/>
                    }
                </div>
                <div className="flex items-center pt-4 pb-2">
                    <Play size={28} weight="fill" className="mr-2 text-color-secondary"/>
                    <h1 className="text-2xl font-bold text-color-primary">Comments</h1>
                </div>
                <div className="mb-4">
                    {user && <CommentInput anime_mal_id={id} user_email={user?.email} username={user?.name} anime_title={anime.data.title}/>}
                </div>
                <CommentBox anime_mal_id={id}/>
            </div>
            <div>
                <VideoPlayer youtubeId={anime.data.trailer.youtube_id}/>
            </div>
        </div>
    )
}

export default Page