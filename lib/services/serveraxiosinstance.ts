import axios from "axios";

export const createServerAxiosInstance = (cookieHeader: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Cookie: cookieHeader,
      Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
    },
    withCredentials: true,
  });
};
