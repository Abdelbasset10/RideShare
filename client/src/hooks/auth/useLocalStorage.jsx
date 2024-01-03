import { useState } from "react";
import { useCookies } from "react-cookie";

export const useLocalStorage = () => {
  const [value, setValue] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const setItem = (key, value) => {
    setCookie("user", JSON.stringify(value));
    setValue(value);
  };

  const getItem = (key) => {
    const value = cookies[key];
    setValue(value);
    return value;
  };

  const removeItem = (key) => {
    removeCookie(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};
