import { authUserSession } from "@/services/auth-service";
import ProfileForm from "@/components/Dashboard/ProfileForm";// Client-side component
import prisma from "@/services/prisma";

const ProfilePage = async () => {
  const userSession = await authUserSession(); // Fetch user session on the server side
  if (!userSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">You must be logged in to view this page.</p>
      </div>
    );
  }
  // console.log(userSession.email)

  const user = await prisma.user.findUnique({
    where: { email: userSession.email },
  });
  // console.log("Fetched user:", user);

  return (
    <div>
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
