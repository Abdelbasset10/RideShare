import axios from "axios";
import { BASE_URL } from "../../utils/globals.js";
import { formatGetQueryOptions } from "../../utils/helpers.ts";
import useAsync from "./useAsync.jsx";
import { useEffect, useState } from "react";

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
export const useFetch =  (
  {url,
  getQueryOptions = {},
  method = "GET",
  headers = {},
  axiosData = {} 
}
) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();


  const fetchData = async () => {
  try {
    let queryString = formatGetQueryOptions(getQueryOptions);
    url = `${BASE_URL}/${url}?${queryString}`

    const ret = await axios({
      method: method,
      url: url,
      data: axiosData,
      headers: headers,
    });

    console.log("🚀 ~ ret:", ret.data);
    
    setData(ret.data);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }

}

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
