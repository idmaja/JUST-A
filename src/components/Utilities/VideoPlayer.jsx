"use client" // agar berjalan di sisi client tidak dalam sisi server

import { XCircle } from "@phosphor-icons/react"
import { useState } from "react"
import YouTube from "react-youtube"

const VideoPlayer = ({ youtubeId }) => {
    const [isOpen, setIsOpen] = useState(true)
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

    const option = {
        width: "300",
        height: "250"
    }

    const Player = () => {
        return (
            <div className="fixed bottom-2 right-2">
                <button 
                    onClick={handleVideoPlayer}
                    className="float-right px-3 mb-1 rounded text-color-primary bg-color-red">
                    {/* <XCircle size={32} /> */}
                    X
                </button>
                <YouTube 
                    videoId={youtubeId} 
                    onReady={(event => event.target.pauseVideo())}
                    opts={option}
                    onError={handleError}
                />
            </div>
        )
    }

    const ButtonOpenPlayer = () => {
        return (
            <button 
                onClick={handleVideoPlayer}
                className="fixed w-40 h-10 text-lg transition-all rounded shadow-xl animate-bounce bottom-5 right-5 bg-color-primary text-color-dark hover:bg-color-yellow outline outline-2 outline-offset-2 outline-color-secondary"
            >
                Watch Trailer!
            </button>
        )
    }

    const ErrorModal = () => (
        <div className="fixed inset-0 flex items-center justify-center transition-all bg-opacity-50 bg-color-primary">
            <div className="p-6 rounded shadow-lg bg-color-primary">
                <h2 className="mb-4 text-xl font-bold">Error</h2>
                <p>Video rusak silahkan coba yang lain :)</p>
                <button 
                    onClick={closeModal}
                    className="px-4 py-2 mt-4 transition-all rounded text-color-primary bg-color-red hover:bg-opacity-75"
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
