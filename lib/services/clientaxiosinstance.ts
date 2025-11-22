import axios from "axios";

const clientaxiosinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export default clientaxiosinstance;
