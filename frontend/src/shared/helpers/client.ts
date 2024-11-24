import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.BASE_API_URI,
});
