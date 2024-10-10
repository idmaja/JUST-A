import SignOut from "@/components/Utilities/SignOut";
import { authUserSession } from "@/services/auth-service";

export default async function SignOutPage() {
  const user = await authUserSession()
  console.log(user)
  return <SignOut user={user}/>
}
