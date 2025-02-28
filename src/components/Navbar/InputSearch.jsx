"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { motion } from "framer-motion";

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()

    const handleSearch = (event) => {
        const keyword = searchRef.current.value

        if (!keyword || keyword.trim() == "") return
        
        if (event.key == "Enter" || event.type == "click") {
            event.preventDefault()
            
            router.push(`/search/${keyword}`)
            // alert("DI ENTER")
        }
        // alert(searchRef.current.value)
    }

    return (
        <div className="relative w-32 sm:w-48 md:max-w-md">
            <motion.input 
                placeholder="Find Anime.." 
                className="w-full h-full p-1 text-sm sm:p-2 sm:text-base rounded-3xl"
                ref={searchRef}
                onKeyDown={handleSearch}
                whileFocus={{ scale: 1.025 }}
            />
            <button className="absolute top-1.5 sm:top-2 end-2 mb-2" onClick={handleSearch}>
                <MagnifyingGlass size={20} />
            </button>
        </div>
    )
}

export default InputSearch