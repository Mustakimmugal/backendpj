import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1"
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
