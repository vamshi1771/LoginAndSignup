import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackBar } from "../redux/actions/snackbaractions";
import Cookies from 'js-cookie';
import { clearUser } from "../redux/actions/userAction";
import { BASE_URL } from "../utils/urls";
const useAxiosInstance = (token) => {
  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(
    (config) => { // Read the token from the cookies
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the headers
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      //  response interceptors
      
      return response;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          dispatch(clearUser()); // Dispatch clearUser action
          dispatch(openSnackBar({ message: 'Session expired. Please log in again.', severity: 'error' }));
        } else {
          console.error(`Error ${status}: ${data.message || 'An error occurred'}`);
          dispatch(openSnackBar({ message: data.message || 'An error occurred', severity: 'error' }));
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        dispatch(openSnackBar({ message: 'No response received from the server', severity: 'error' }));
      } else {
        console.error('Error setting up request:', error.message);
        dispatch(openSnackBar({ message: error.message, severity: 'error' }));
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;