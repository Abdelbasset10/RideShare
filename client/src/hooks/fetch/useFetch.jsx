import { BASE_URL } from "../../utils/globals";
import { formatGetQueryOptions } from "../../utils/helpers";
import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
    headers: { "Content-Type": "application/json" },
  };

  /**
   * Send HTTPS Request and manage the error,and loading phase (url: login)
   * @param {string} url 
   * @param {{}} getQueryOptions 
   * @param {{}} options 
   * @param {[]} dependencies 
   * @returns 
   */
export const useFetch = ( url, getQueryOptions = {}, options = {} , dependencies = [] ) => {
  
  url = `${BASE_URL}/${url}`

  // API KEY INTEGRATION IN THE HTTP REQUEST 
  //getQueryOptions.apiKey = user.apiKey; 

  // Formatting query options into string
  let queryString = formatGetQueryOptions(getQueryOptions);

  // TODO Handle when the apiKey is wrong or expired 
  
  // useAsync Hook to handle the request by taking in consideration dependecies
  return useAsync(() => {
    return fetch(`${url}?${queryString}`, {
      ...DEFAULT_OPTIONS,
      ...options,
    }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
}
 