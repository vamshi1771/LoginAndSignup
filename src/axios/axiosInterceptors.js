import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openSnackBar } from "../redux/actions/snackbaractions";
const useAxiosInstance = () => {
  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      //  request interceptors 
      const userName = 'Akhil';
      const password = 'Vamshi@1771';
      config.headers['userName'] = userName;
      config.headers['password'] = password;
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
      if (error.response && error.response.data) {
        dispatch(openSnackBar({ message: error.response.data.message, severity: 'error' }));
      } else {
        dispatch(openSnackBar({ message: 'An unexpected error occurred', severity: 'error' }));
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;