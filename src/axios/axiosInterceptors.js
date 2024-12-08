import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { clearUser } from "../redux/actions/userAction";


// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://localhost:8080/", // Replace with your API base URL
  timeout: 10000, // Optional: Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    const user = useSelector((state) => state.user.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Successful response handling
    return response;
  },
  (error) => {
    const navigate = useNavigate(); 
    const disPatch = useDispatch();
    if (error.response && error.response.status === 401) {
        disPatch(openSnackBar({ severity: "error", message: "Please Login first" }));
      disPatch(clearUser());
      navigate("/login"); // Navigate to login page
    }

    return Promise.reject(error); // Pass error to calling code
  }
);

export default axiosInstance;