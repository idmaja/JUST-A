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
        <section className="w-full px-4 pt-10 mt-4 md:pt-24">
            <Header title={"COMMENTS"}/>
            <div className="grid grid-cols-1 gap-4 py-0">
                {comments.map(comment => {
                    return (
                        <div 
                            key={comment.id} 
                            className="relative w-auto p-4 rounded md:mx-5 bg-color-primary text-color-dark outline-color-hover outline-1 outline-double"
                        >
                            {/* Bagian Link */}
                            <Link href={`/anime/${comment.anime_mal_id}`} className="block">
                                <div className="ml-2">
                                    <p className="text-sm">{comment.anime_title}</p>
                                    <p className="italic">{comment.comment}</p>
                                </div>
                            </Link>
                            
                            {/* Tombol Delete */}
                            {user && (
                                <div className="absolute top-5 right-5">
                                    <CommentDelete commentId={comment.id} />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )   
}

export default page
