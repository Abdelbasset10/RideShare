import axios from "axios";
import { BASE_URL } from "./globals";
import { formatGetQueryOptions } from "./helpers.ts";

export const fetchFnc = async ({
  url,
  method = "GET",
  headers = {},
  data = {},
  getQueryOptions = {},
  relative = true,
}) => {
  if (relative) {
    url = `${BASE_URL}/${url}`;
  }
  headers["Access-Control-Allow-Origin"] = "*";

  let queryString = formatGetQueryOptions(getQueryOptions);
  url = `${url}${queryString}`

  try {
    const res = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });
    return res;
  } catch (e) {
    throw e?.response?.data?.message || "Erreur lors de la connexion";
  }
};
