"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {
  const [comment, setComment] = useState("")
  const [isCreated, setIsCreated] = useState(false)

  const router = useRouter()

  const handleInput = (event) => {
    setComment(event.target.value)
  }

  const handlePosting = async(event) => {
    event.preventDefault()

    const data = {anime_mal_id, user_email, comment, username, anime_title}
    
    const response = await fetch('/api/v1/comment', {
        method: "POST",
        body: JSON.stringify(data)
    })

    const postComment = await response.json()
    if (postComment.status == 200) {
        setIsCreated(true)
        setComment("")
        router.refresh()
    }
    return
  }

    return (
    <div className="flex flex-col gap-2">
        {isCreated && <p className="text-color-primary">COMMENT POSTED!</p>}
        <textarea onChange={handleInput} className="block w-full h-32 p-4 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={comment} rows="4"/>
        <button onClick={handlePosting} className="w-full px-3 py-2 transition-all bg-transparent border border-gray-900 rounded md:w-52 hover:bg-color-secondary text-color-primary hover:text-color-primary focus:outline-none ring-color-secondary rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">POST</button>
    </div>
    )
  }


export default CommentInput
