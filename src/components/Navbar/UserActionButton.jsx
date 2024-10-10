import { authUserSession } from "@/services/auth-service"
import { SignIn, SignOut, User } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"

const UserActionButton = async() => {
    const user = await authUserSession()

    const actionLabel = user ? 
                        // <SignOut size={32} className="text-color-red" weight="bold" alt="Sign out"/> 
                        <><h5 className="flex items-center justify-center w-16 text-base md:w-24 h-9 text-color-primary">Sign Out</h5></>
                        : 
                        // <SignIn size={32} className=" text-color-primary" alt="Sign in" weight="bold"/>
                        <><h5 className="flex items-center justify-center w-16 text-base md:w-24 h-9 text-color-primary">Sign In</h5></>
    const actionURL = user ? "/auth/signout" : "/auth/signin"

    const actionButtonClass = user ? 
        "inline-block px-2 md:py-1 pt-1 mr-2 text-2xl transition-all rounded-3xl bg-color-red hover:bg-color-secondary" // Sign Out
        : 
        "inline-block px-2 py-1 text-2xl transition-all rounded-3xl bg-color-hover hover:bg-color-secondary" // Sign In

    return (
        <div className="flex justify-between gap-2">
            {
                user ? 
                <Link href="/users/dashboard" className=" bg-color-dark text-color-primary hover:bg-color-secondary rounded-3xl">
                    <Image src={user?.image} alt="Dashboard" width={137} height={137} className="rounded-full"/>
                </Link> 
                    : null
            } 
            <Link href={actionURL} className={actionButtonClass}>
                {actionLabel}
            </Link>
        </div>
    )
}

export default UserActionButton