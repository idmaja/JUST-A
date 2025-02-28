"use client"

import { useRouter } from "next/navigation"
import { Trash } from '@phosphor-icons/react/dist/ssr'
import { useState } from "react"
import SuccessModal from "../Utilities/SuccessModal"

const CommentDelete = ({ commentId }) => {
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleDeleteClick = (event) => {
    event.preventDefault()
    setShowModal(true) 
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/comment/${commentId}`, {
        method: "DELETE"
      })

      const result = await response.json();
      
      if (result.status === 200 && result.isDeleted) {
        setShowModal(false)
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.refresh()
          location.reload()
        }, 2000);
      } else {
        setShowFailedModal(true);
        setTimeout(() => {
          setShowFailedModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error while deleting comment:", error)
      setShowFailedModal(true);
      setTimeout(() => {
        setShowFailedModal(false);
      }, 2000);
    }
  } 

  const handleCancel = (event) => {
    event.preventDefault()
    setShowModal(false) 
  }

  return (
    <div>
      <button onClick={handleDeleteClick}>
        <Trash size={25} weight="fill" className="transition-all hover:text-color-red"/>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 mx-4 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Are you sure?</h2>
            <p className="mb-6 text-gray-600">Do you really want to delete this comment? This action cannot be undone!</p>
            <div className="flex justify-end gap-4">
              {/* Tombol Cancel */}
              <button 
                className="px-4 py-2 font-semibold text-gray-700 transition-colors border border-gray-400 rounded hover:bg-gray-200"
                onClick={handleCancel}
              >
                Cancel
              </button>

              {/* Tombol Delete */}
              <button 
                className="px-4 py-2 font-semibold text-white transition-colors bg-red-600 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <SuccessModal message="Comment deleted!" />
      )}
      {showFailedModal && (
        <SuccessModal message="Failed to delete comment, try again!" />
      )}
      
    </div>
  )
}

export default CommentDelete