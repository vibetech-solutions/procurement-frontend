import axios from "axios";

const clientaxiosinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

export default clientaxiosinstance;
