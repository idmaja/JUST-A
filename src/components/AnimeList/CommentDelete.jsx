"use client"

import { useRouter } from "next/navigation"
import { Trash } from '@phosphor-icons/react/dist/ssr'

const CommentDelete = ({ commentId }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/comment/${commentId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error("Failed to delete comment.")
      }
    } catch (error) {
      console.error("Error while deleting comment:", error)
    }
  } 

  return (
    <button onClick={handleDelete}>
      <Trash size={16} weight="fill" className="transition-all hover:text-color-red"/>
    </button>
  )
}

export default CommentDelete