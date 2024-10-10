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
        <textarea onChange={handleInput} placeholder="Put your comment here!!" className="block w-full h-20 p-4 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 " value={comment} rows="4"/>
        <button onClick={handlePosting} className="w-full px-2 py-2 my-2 transition-all bg-transparent border border-white rounded md:w-52 hover:bg-color-secondary text-color-primary hover:text-color-primary focus:outline-none ring-color-secondary rounded-s-lg">POST</button>
    </div>
    )
  }


export default CommentInput
