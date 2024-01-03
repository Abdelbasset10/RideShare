import { useEffect } from "react";
import { useUser } from "./useUser";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../utils/globals";
import axios from "axios";
import { fetchFnc } from "../../utils/fetch";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const [cookies] = useCookies(["user"]);
  const { setItem, getItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    console.log("🚀 ~ file: useAuth.jsx:16 ~ useEffect ~ user:", user);

    if (user) {
      addUser(user);
    } else {
      removeUser();
    }
  }, []);

  const login = async (userCredentials) => {
    const form = new FormData();
    for (let key in userCredentials) {
      form.append(key, userCredentials[key]);
    }

    try {
      const data = await fetchFnc({
        url: "auth/sign-in",
        method: "POST",
        data: form,
      });
      console.log("🚀 ~ file: useAuth.jsx:36 ~ login ~ data:", data);
      let user = data.data.user;
      user.apiKey = data.data.token;

      addUser(user);
      return "Utilisateur crée ave succes";
    } catch (e) {
      throw e || e?.message;
    }
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
