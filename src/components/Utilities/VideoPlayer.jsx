"use client" // agar berjalan di sisi client tidak dalam sisi server

import { Play, X } from "@phosphor-icons/react"
import { useState } from "react"
import YouTube from "react-youtube"

const VideoPlayer = ({ youtubeId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleVideoPlayer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleError = () => {
        setIsError(true)
    }

    const closeModal = () => {
        setIsError(false)
    }

    const options = {
        width: "100%",  
        height: "100%", 
    }

    const Player = () => {
        return (
            <div className="fixed bottom-5 right-5 md:p-2 p-2 bg-color-dark shadow-xl rounded-lg md:max-w-[640px] md:max-h-[360px] w-[90%] h-[200px] sm:h-[250px] md:h-[360px]">
                {/* Close Button */}
                <button 
                    onClick={handleVideoPlayer}
                    className="absolute z-10 p-1 text-white transition-all rounded-full shadow-lg md:p-2 -top-4 -right-4 bg-color-red hover:bg-red-700"
                >
                    <X size={28} weight="bold" />
                </button>
                
                {/* YouTube Video with rounded corners */}
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <YouTube 
                        videoId={youtubeId}
                        opts={options}
                        onError={handleError}
                        className="w-full h-full"
                    />
                </div>
            </div>
        )
    }
    
    

    // Button to open the video player
    const ButtonOpenPlayer = () => {
        return (
            <button 
                onClick={handleVideoPlayer}
                className="fixed flex items-center w-32 h-12 text-xl transition-all rounded-full shadow-lg md:h-12 md:w-40 bottom-5 right-5 bg-color-primary text-color-dark md:text-2xl hover:bg-color-secondary hover:text-white animate-bounce"
            >
                <Play size={24} weight="fill" className="ml-3 mr-1 md:ml-8 md:mr-2 text-color-secondary hover:text-white" />
                <span className="md:block">Trailer</span>
            </button>
        )
    }

    // Error Modal when the video fails to load
    const ErrorModal = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="p-6 rounded-lg shadow-xl bg-color-primary text-color-dark">
                <h2 className="mb-4 text-xl font-bold">Error</h2>
                <p>Video rusak, silahkan coba yang lain :)</p>
                <button 
                    onClick={closeModal}
                    className="px-4 py-2 mt-4 text-white transition-all bg-red-600 rounded-md hover:bg-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    )

    return (
        <>
            {isError && <ErrorModal />}
            {isOpen ? <Player /> : <ButtonOpenPlayer />}
        </>
    )
}

export default VideoPlayer
