import { authUserSession } from "@/services/auth-service";
import ProfileForm from "@/components/Dashboard/ProfileForm";// Client-side component
import prisma from "@/services/prisma";

const ProfilePage = async () => {
  const userSession = await authUserSession(); // Fetch user session on the server side
  console.log(userSession.email)

  if (!userSession) {
    return <p>Please log in to access your profile.</p>;
  }

  const user = await prisma.user.findUnique({
    where: { email: userSession.email },
  });
  console.log("Fetched user:", user);

  return (
    <div>
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
