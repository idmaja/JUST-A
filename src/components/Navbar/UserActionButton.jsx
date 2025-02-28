import { authUserSession } from "@/services/auth-service";
import UserActionButtonClient from "./UserActionButtonClient";

const UserActionButton = async () => {
  const user = await authUserSession();
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">You must be logged in to view this page.</p>
      </div>
    );
  }

  return <UserActionButtonClient user={user} />;
};

export default UserActionButton;
