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
        <div className="relative flex items-center mt-10 mb-10">
            <div className="absolute left-0">
                <button className="text-color-primary" onClick={handleBack}>
                    <div className="w-12 h-12 transition-all md:ml-5 md:w-14 md:h-14 hover:text-color-secondary">
                        <ArrowFatLeft className="w-full h-full mt-2" weight="light" />
                    </div>
                    {/* <ArrowFatLeft size={60} className="transition-all md:ml-5 hover:text-color-secondary" weight="light" /> */}
                </button>
            </div>
            <h3 className="mx-auto text-3xl font-bold underline text-color-secondary underline-offset-4">
                {title}
            </h3>
        </div>
    )
}

export default Header