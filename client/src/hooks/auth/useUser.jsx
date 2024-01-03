import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useCookies } from "react-cookie";
import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (userData) => {
    console.log("🚀 ~ file: useUser.jsx:10 ~ addUser ~ setUser:", setUser);
    setUser(userData);
    setItem("user", userData);
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser, setUser };
};
