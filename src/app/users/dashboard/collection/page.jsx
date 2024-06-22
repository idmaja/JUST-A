import Header from "@/components/Dashboard/Header"
import { authUserSession } from "@/services/auth-service"
import prisma from "@/services/prisma"
import Image from "next/image"
import Link from "next/link"

const Page = async() => {
    const user = await authUserSession()
    const collection = await prisma.collection.findMany({ where: {user_email: user.email} })

    return (
        <section className="w-full px-4 mt-4">
            <Header title={"COLLECTION"}/>
            <div className="grid gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {collection.map((collect, index) => {
                    return (
                        <Link key={index} href={`/anime/${collect.anime_mal_id}`} className="relative transition-all cursor-pointer text-color-primary hover:text-color-secondary">
                            <Image src={collect.anime_image} alt={collect.anime_image} width={500} height={500} className="object-cover w-full h-64 rounded"/>
                            {/* <div className="absolute bottom-0 flex items-center justify-center w-full h-16 bg-color-accent">
                                <h5 className="text-xl text-center">{collect.anime_title}</h5>
                            </div> */}
                            <h3 className="pt-1 font-bold md:text-xl text-md">{collect.anime_title}</h3>
                        </Link>
                    );
                })}               
            </div>
        </section>
    )
}

export default Page