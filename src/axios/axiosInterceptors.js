import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { clearUser } from "../redux/actions/userAction";


const useAxiosInstance = ({token}) => {
  // Create Axios instance
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/", 
    timeout: 10000, 
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
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
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // dispatch(openSnackBar({ severity: "error", message: "Please login first" }));
        // dispatch(clearUser());
        // navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;