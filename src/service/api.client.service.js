import axios from "axios";

let headers = {};

const accessToken = localStorage.getItem("accessToken") || null;
if (accessToken) {
  headers = {
    Authorization: `Bearer ${accessToken}`,
  };
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers,
});

export default apiClient;
