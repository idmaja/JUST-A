"use client"
import { ArrowFatLeft } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const Header = ({ title }) => {
    const router = useRouter()

    const handleBack = (event) => {
        event.preventDefault()
        router.back()
    }

    return (
        <div className="flex items-center mb-4">
            <button className="text-color-primary" onClick={handleBack}>
                <ArrowFatLeft size={32} className="transition-all hover:text-color-secondary"/>
            </button>
            <div className="flex-grow"></div>
            <h3 className="text-3xl font-bold underline text-color-secondary underline-offset-4">
                {title}
            </h3>
            <div className="flex-grow"></div>
        </div>

    )
}

export default Header