import { authUserSession } from "@/services/auth-service"
import Image from "next/image"
import Link from "next/link"

const Page = async() => {
    const user = await authUserSession()

    return (
        <div className="flex items-center justify-center pt-16">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded shadow-lg text-color-primary">
                <h5 className="pb-6 text-2xl font-bold">Selamat datang, {user?.name}!</h5>
                <Image src={user?.image} alt="..." width={150} height={150} className="rounded-full" />
                <div className="flex flex-wrap gap-4 py-8">
                <Link 
                    href="/users/dashboard/collection"
                    className="px-4 py-3 text-xl font-bold transition-all bg-white border rounded text-color-blue focus:outline-none border-color-secondary hover:bg-color-secondary hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    My Collection
                </Link>
                <Link 
                    href="/users/dashboard/comment"
                    className="px-4 py-3 text-xl font-bold transition-all bg-white border rounded text-color-blue focus:outline-none border-color-secondary hover:bg-color-secondary hover:text-color-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    My Comment
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Page