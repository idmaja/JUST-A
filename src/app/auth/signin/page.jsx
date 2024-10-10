// app/auth/signin/page.jsx
import { getProviders } from "next-auth/react";
import SignIn from "@/components/Utilities/SignIn";

export default async function SignInPage() {
  const providers = await getProviders(); // Fetch providers

  return <SignIn providers={providers} />;
}
