// gets user info form the react-auth-kit and return isAdmin and userId and userName

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ROLES } from "../utils/staticData";

export default function useUserInfo() {
  const authState = useAuthUser();
  return {
    isSuperAdmin: authState.role === ROLES.SUPER_ADMIN,
    isAdmin: authState.role === ROLES.ADMIN,
    isEmployee: authState.role === ROLES.EMPLOYEE,
    userId: authState.id,
    userName: authState.username,
  };
}
