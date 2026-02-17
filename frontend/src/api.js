import axios from "axios";

const API = axios.create({
  baseURL: "https://backendpj.onrender.com/api/v1",
});

// Automatically token attach karega
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
