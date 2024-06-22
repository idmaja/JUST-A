import { authUserSession } from "@/services/auth-service"
import { SignIn, SignOut, User } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"


const UserActionButton = async() => {
    const user = await authUserSession()

    const actionLabel = user ? 
                        <SignOut size={32} className="text-color-red"/> 
                        : 
                        <SignIn size={32} className=" text-color-primary"/>
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"
    return (
        <div className="flex justify-between gap-2">
            {
                user ? 
                <Link href="/users/dashboard" className=" bg-color-dark text-color-primary hover:bg-color-secondary rounded-3xl">
                    <Image src={user?.image} alt="Dashboard" width={80} height={80} className="rounded-3xl"/>
                </Link> 
                    : null
            } 
            <Link href={actionURL} className="inline-block px-2 py-1 text-2xl rounded-3xl bg-color-hover hover:bg-color-secondary">{actionLabel}</Link>
        </div>
    )
}

export default UserActionButton