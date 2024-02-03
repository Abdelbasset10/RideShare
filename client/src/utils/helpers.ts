import { toast } from "react-toastify";
import { User, UserTypes } from "./type-interfaces.ts";

export const successToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const errorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

/**
 * Format a GET Query object to a string usable in the url
 * @param {object} queryOptions
 */
export const formatGetQueryOptions = (queryOptions = {}) => {
  
  let returnValue = "";
    for (let [key, value] of Object.entries(queryOptions)) {
      if (value !== undefined && value !== "") {
      returnValue = `${returnValue}${key}=${value}&`;
     }

   }
  return returnValue;
};

interface UserAuthorizedParams {
  user: User | null;
  role: string;
}
export const isUserAdmin = ({ user = null }: UserAuthorizedParams): boolean => {
  if (!user) return false;

  if (user.type === UserTypes.ADMIN) return true;
  return false;
};
