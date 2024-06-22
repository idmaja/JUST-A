import { useState, useEffect } from "react"
import Header from '@/components/Dashboard/Header'
import prisma from '@/services/prisma'
import Link from 'next/link'

const Comment = ({ user }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const commentsData = await prisma.comment.findMany({ where: { user_email: user.email } })
            setComments(commentsData)
        }

        fetchData()
    }, [user])

    return (
        <section className="w-full px-4 mt-4">
            <Header title={"KOMENTARKU"} />
            <div className="grid grid-cols-1 gap-4 py-2">
                {comments.map(comment => (
                    <Link href={`/anime/${comment.anime_mal_id}`} key={comment.id} className="p-4 bg-color-primary text-color-dark">
                        <p className="text-sm">{comment.anime_title}</p>
                        <p className="italic">{comment.comment}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Comment
