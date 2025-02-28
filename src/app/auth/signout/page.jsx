import SignOut from "@/components/Utilities/SignOut";
import { authUserSession } from "@/services/auth-service";

export default async function SignOutPage() {
  const user = await authUserSession()
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">You must be logged in to view this page.</p>
      </div>
    );
  }
  // console.log(user)
  return <SignOut user={user}/>
}
