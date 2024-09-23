import { authUserSession } from "@/services/auth-service"
import { SignIn, SignOut, User } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"


const UserActionButton = async() => {
    const user = await authUserSession()

    const actionLabel = user ? 
                        <SignOut size={32} className="text-color-red" weight="bold" alt="Sign out"/> 
                        // <><h5 className="text-color-red w-24 text-center text-lg transition-all justify-center items-center">Sign Out</h5></>
                        : 
                        <SignIn size={32} className=" text-color-primary" alt="Sign in" weight="bold"/>
                        // <><h5 className="text-color-primary w-24 text-center text-lg transition-all justify-center ">Sign In</h5></>
    const actionURL = user ? "/api/auth/signout" : "/api/auth/signin"
    return (
        <div className="flex justify-between gap-2">
            {
                user ? 
                <Link href="/users/dashboard" className=" bg-color-dark text-color-primary hover:bg-color-secondary rounded-3xl">
                    <Image src={user?.image} alt="Dashboard" width={90} height={90} className="rounded-3xl"/>
                </Link> 
                    : null
            } 
            <Link href={actionURL} className="inline-block px-2 py-1 text-2xl rounded-3xl bg-color-hover hover:bg-color-secondary">{actionLabel}</Link>
        </div>
    )
}

export default UserActionButton