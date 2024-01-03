import { toast } from "react-toastify";

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
}


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
}



/**
 * Format a GET Query object to a string usable in the url
 * @param {object} queryOptions
 */
export const formatGetQueryOptions = (queryOptions = {}) => {
    let returnValue = "";
    if (queryOptions.length > 0) {
      for (let [key, value] of queryOptions.entries()) {
        returnValue = `${returnValue}${key}=${value}&`;
        console.log(key + " = " + value);
      }
    }
  };