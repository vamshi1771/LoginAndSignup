const isProduction =false;

export const BASE_URL = !isProduction ? "http://localhost:8080" : "http://51.20.156.209:8080";

export const ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT : "/logout"
};
export default {
  BASE_URL,
  ENDPOINTS,
};


