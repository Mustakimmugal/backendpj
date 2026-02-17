import axios from "axios";

const API = axios.create({
  baseURL: "https://backendpj.onrender.com"
});

// Automatically token attach karega
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.authorization = token;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
