"use client"

import { Archive, Trash } from '@phosphor-icons/react/dist/ssr'
import React, { useState, useEffect } from 'react'
import SuccessModal from '../Utilities/SuccessModal'
import { useRouter } from 'next/navigation'

const CollectionButton = ({ anime_mal_id, user_email, anime_image, anime_title }) => {
  const [isInCollection, setIsInCollection] = useState(false)
  const [loading, setLoading] = useState(true)

  const [showSuccessAddModal, setShowSuccessAddModal] = useState(false);
  const [showFailedAddModal, setShowFailedAddModal] = useState(false);

  const [showSuccessDeleteModal, setShowSuccessDeleteModal] = useState(false);
  const [showFailedDeleteModal, setShowFailedDeleteModal] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const checkCollectionStatus = async () => {
      try {
        const response = await fetch(`/api/v1/collection?anime_mal_id=${anime_mal_id}&user_email=${user_email}`)
        const result = await response.json()
        if (result.status === 200) {
          setIsInCollection(result.isInCollection)
        }
      } catch (error) {
        console.error("Error fetching collection status:", error)
        setShowFailedModal(true);
        setTimeout(() => {
          setShowFailedModal(false);
        }, 2000);
      } finally {
        setLoading(false)
      }
    }

    checkCollectionStatus()
  }, [anime_mal_id, user_email])

  const handleCollection = async(event) => {
    event.preventDefault()

    const data = {anime_mal_id, user_email, anime_image, anime_title}
    
    const response = await fetch('/api/v1/collection', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const collection = await response.json()
    if (collection.status === 200) {
      setShowSuccessAddModal(true);
      setTimeout(() => {
        setShowSuccessAddModal(false);
      }, 2000);
      setIsInCollection(true)
    } else {
      console.error("Error adding collection : ", error)
      setShowFailedAddModal(true);
      setTimeout(() => {
        setShowFailedAddModal(false);
      }, 2000);
    }
  }

  const handleDelete = async(event) => {
    event.preventDefault()

    const data = {anime_mal_id, user_email}

    const response = await fetch('/api/v1/collection', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    if (result.status === 200) {
      setShowSuccessDeleteModal(true);
      setTimeout(() => {
        setShowSuccessDeleteModal(false);
      }, 2000);
      setIsInCollection(false)
    } else {
      console.error("Error deleting collection : ", error)
      setShowFailedDeleteModal(true);
      setTimeout(() => {
        setShowFailedDeleteModal(false);
      }, 2000);
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center w-4 h-4 custom-loader'></div>
    )   
  }

  return (
    <>
      {isInCollection ? (
        <button onClick={handleDelete} className="w-full px-2 py-1 my-2 transition-all bg-transparent border border-white rounded md:w-64 hover:bg-color-secondary text-color-primary hover:text-color-primary focus:outline-none ring-color-secondary rounded-s-lg">
          <div className='flex items-center justify-center'>
            <Trash size={16} weight="fill" className='mr-1'/>REMOVE FROM COLLECTION
          </div>
        </button>
      ) : (
        <button onClick={handleCollection} className="w-full px-2 py-1 my-2 transition-all bg-transparent border border-white rounded md:w-64 hover:bg-color-secondary text-color-primary hover:text-color-primary focus:outline-none ring-color-secondary rounded-s-lg">
          <div className='flex items-center justify-center'>
            <Archive size={16} weight="fill" className='mr-1'/>ADD TO COLLECTION     
          </div>
        </button>
      )}

      {showSuccessAddModal && (
        <SuccessModal message="Collection added successfully!" />
      )}
      {showFailedAddModal && (
        <SuccessModal message="Failed to add collection, try again!" />
      )}

      {showSuccessDeleteModal && (
        <SuccessModal message="Collection deleted successfully!" />
      )}
      {showFailedDeleteModal && (
        <SuccessModal message="Failed to delete collection, try again!" />
      )}

    </>
  )
}

export default CollectionButton
