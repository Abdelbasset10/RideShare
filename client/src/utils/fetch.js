import axios from "axios";
import { BASE_URL } from "./globals";

export const fetchFnc = async ({
  url,
  method = "GET",
  headers = {},
  data = {},
  relative = true,
}) => {
  if (relative) {
    url = `${BASE_URL}/${url}`;
  }
  headers["Access-Control-Allow-Origin"] = "*";

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
