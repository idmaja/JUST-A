import CommentDelete from '@/components/AnimeList/CommentDelete'
import Header from '@/components/Dashboard/Header'
import { authUserSession } from '@/services/auth-service'
import prisma from '@/services/prisma'
import Link from 'next/link'
import React from 'react'

const page = async() => {
    const user = await authUserSession()
    const comments = await prisma.comment.findMany({where: {user_email: user.email}})
    return (
        <section className="w-full px-4 mt-4">
            <Header title={"COMMENTS"}/>
            <div className="grid grid-cols-1 gap-4 py-2">
                {comments.map(comment => {
                    return (
                        <Link href={`/anime/${comment.anime_mal_id}`} key={comment.id} className="p-4 rounded bg-color-primary text-color-dark outline-color-hover outline-1 outline-double"> 
                            <div className="relative flex items-center">
                                <div className="ml-2">
                                    <p className="text-sm">{comment.anime_title}</p>
                                    <p className="italic">{comment.comment}</p>
                                </div>
                                <div className="absolute ml-2 right-2">
                                    {user && <CommentDelete commentId={comment.id} />}
                                </div>
                            </div>
                        </Link>
                    )
                    })}
            </div>
        </section>
    )   
}

export default page
