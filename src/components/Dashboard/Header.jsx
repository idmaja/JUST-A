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
        <div className="relative flex items-center mb-4">
            <div className="absolute left-0">
                <button className="text-color-primary" onClick={handleBack}>
                    <ArrowFatLeft size={50} className="transition-all hover:text-color-secondary" weight="fill" />
                </button>
            </div>
            <h3 className="mx-auto text-3xl font-bold underline text-color-secondary underline-offset-4">
                {title}
            </h3>
        </div>
    )
}

export default Header