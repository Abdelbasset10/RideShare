import { useEffect } from "react";
import { useUser } from "./useUser";
import { useCookies } from "react-cookie";

export const useAuth = () => {

  const { user, addUser, removeUser } = useUser();
  const { cookies } = useCookies(['user']);
  
  useEffect(() => {
    const user = cookies?.user;
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user) => {
    // TODO VERIFY THE CREDENTIALS
    user.apiKey = 'apiKey';
    ///////////////////////
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};