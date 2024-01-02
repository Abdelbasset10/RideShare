import axios from "axios";
import { BASE_URL } from "./globals";

export const fetchFnc = ({ url, method = "GET", headers = {}, data = {} }) => {
  url = `${BASE_URL}/${url}`;

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            reject(errorData.message || "Unknown error occurred");
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.ok) {
          resolve(data);
        } else {
          reject(data.message || "Unknown error occurred");
        }
      })
      .catch((err) => {
        reject(err?.response?.data?.message || err?.message);
      });
  });
};
