import { authUserSession } from "@/services/auth-service"
import prisma from "@/services/prisma"
import { Archive, Chat } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"

const Page = async() => {
    const user = await authUserSession()
    const userDb = await prisma.user.findUnique({
        where: { email: user.email },
      });
    // console.log('username: ', userDb.username)

    return (
        <div className="flex items-center justify-center pt-60">
            <div className="flex flex-col items-center justify-center p-8 rounded shadow-lg bg-slate-800 text-color-primary">
                <h5 className="pb-1 text-2xl font-bold">Welcome, {userDb?.username}!</h5>
                <h6 className="mb-6 text-sm text-color-secondary">{userDb?.email}</h6>
                <Image src={user?.image} alt="..." width={150} height={150} className="mb-3 rounded-full" />
                <div className="flex flex-wrap gap-4 py-4">
                    <Link 
                        href="/users/dashboard/collection"
                        className="px-4 py-3 text-xl font-bold transition-all border rounded text-color-blue focus:outline-none border-color-secondary hover:bg-color-secondary hover:text-color-primary">
                        <div className="flex items-center gap-2">
                            Collection
                            <Archive size={24}/>
                        </div>
                    </Link>
                    <Link 
                        href="/users/dashboard/comment"
                        className="px-4 py-3 text-xl font-bold transition-all border rounded text-color-blue focus:outline-none border-color-secondary hover:bg-color-secondary hover:text-color-primary">
                        <div className="flex items-center gap-2">
                            Comment
                            <Chat size={24}/>
                        </div>
                    </Link>
                </div>
                    <Link 
                        href="/users/profile"
                        className="underline transition-all hover:text-color-secondary">
                        Change Username?
                    </Link>
            </div>
        </div>
    )
}

export default Page