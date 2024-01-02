import { useEffect } from "react";
import { useUser } from "./useUser";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../utils/globals";
import axios from "axios";
import { fetchFnc } from "../../utils/fetch";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    const user = cookies.user;
    if (user) {
      addUser(user);
    }
  });

  const login = async (userCredentials) => {
    const form = new FormData();
    for (let key in userCredentials) {
      form.append(key, userCredentials[key]);
    }

    return new Promise((resolve, reject) => {
      fetchFnc({
        url: "auth/sign-in",
        method: "POST",
        data: form,
      })
        .then((data) => {
          console.log("🚀 ~ file: useAuth.jsx:31 ~ .then ~ data:", data);
          resolve(data);
        })
        .catch((e) => {
          console.log("🚀 ~ file: useAuth.jsx:35 ~ login ~ e:", e);
          reject(e);
        });
    });
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};
