"use client"

import { FileSearch } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  const router = useRouter()
  return (
    <div className='flex items-center justify-center max-w-xl min-h-screen mx-auto'>
        <div className='flex flex-col items-center justify-center gap-3'>
            <FileSearch size={32} className=' text-color-accent'/>
            <h3 className='text-2xl font-bold text-color-accent'>NOT FOUND</h3>
            <button onClick={() => router.back()} className="underline transition-all text-color-primary hover:text-color-accent">
                Kembali
            </button>
        </div>
    </div>
  )
}

export default NotFound
