import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useCookies } from "react-cookie";


export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const  [cookies,setCookie, removeCookie] = useCookies(['user']);

  const addUser = (user) => {
    setUser(user);
    setCookie("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeCookie("user");
  };

  return { user, addUser, removeUser };
};