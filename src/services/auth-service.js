import { getServerSession } from "next-auth"
import { authOption } from "@/app/api/auth/[...nextauth]/route"

export const authUserSession = async() => {
    const session = await getServerSession(authOption)
    return session?.user
}

// New function to get the admin session
export const getAdminSession = async () => {
    const session = await getServerSession(authOption);
  
    // Check if the user is logged in and has an admin role
    if (session?.user && session.user.role === "admin") {
      return session.user;
    }
  
    // If not an admin, return null
    return null;
  };