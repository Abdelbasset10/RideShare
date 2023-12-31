import { useEffect } from "react";
import { useUser } from "./useUser";
import { useCookies } from "react-cookie";
import { BASE_URL } from "../../utils/globals";

export const useAuth = () => {

  const { user, addUser, removeUser } = useUser();
  const [ cookies ]  = useCookies(['user']);
  
  useEffect(() => {
    const user = cookies.user;
    if (user) {
      addUser(user);
    }
  }, []);

  const login = (userCredentials) => {
    // TODO VERIFY THE CREDENTIALS
  
    fetch(`https://dummyjson.com/auth/login`,{
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userCredentials)
    }).then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          return addUser(data)
        }
        console.log(data.message)
      })
    }).catch((err) => console.log(err))
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout };
};