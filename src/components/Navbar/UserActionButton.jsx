import { authUserSession } from "@/services/auth-service";
import UserActionButtonClient from "./UserActionButtonClient";

const UserActionButton = async () => {
  const user = await authUserSession();
  return <UserActionButtonClient user={user} />;
};

export default UserActionButton;
