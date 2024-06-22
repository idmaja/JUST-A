import { useState, useEffect } from "react"
import Header from "@/components/Dashboard/Header"
import prisma from "@/services/prisma"
import Image from "next/image"
import Link from "next/link"

const Collection = ({ user }) => {
    const [collection, setCollection] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const collectionData = await prisma.collection.findMany({ where: { user_email: user.email } })
            setCollection(collectionData)
        }

        fetchData()
    }, [user])

    return (
        <section className="w-full px-4 mt-4">
            <Header title={"KOLEKSIKU"} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {collection.map((collect, index) => (
                    <Link key={index} href={`/anime/${collect.anime_mal_id}`} className="relative">
                        <Image src={collect.anime_image} alt={collect.anime_image} width={350} height={350} className="w-full" />
                        <div className="absolute bottom-0 flex items-center justify-center w-full h-16 bg-color-accent">
                            <h5 className="text-xl text-center">{collect.anime_title}</h5>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Collection
