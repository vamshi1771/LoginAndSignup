import def from "ajv/dist/vocabularies/discriminator";
import { BASE_URL, ENDPOINTS } from "../utils/urls";

import AxiosInstance from "../axios/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const user = useSelector((state) => state.user.cookie);
    const disPatch = useDispatch();
    const navigate = useNavigate();

    const axios = AxiosInstance({ user });
    useEffect(() => {
        console.log("login response =>")
        console.log(`; ${document.cookie}`);
    }, [])

    const handleLogout = async (e) => {
            console.log(user)
        try{
            const response = await axios.get(`${ENDPOINTS.LOGOUT}`);
            disPatch(openSnackBar({ severity: "success" ,message : "Logged out Successfully" }));
        }
        catch(err){
            disPatch(openSnackBar({ severity: "error", message: err.message }));
        }
        // axios.get('http://localhost:3000/logout', { withCredentials: true })
        //     .then(response => {
        //         console.log('Response:', response);
        //         // Cookies are automatically managed by the browser
        //         console.log("docuument", document.cookie)
        //     })
        //     .catch(error => console.error('Error:', error));
    }
    return (
        <div>
            <h1>Hello</h1>
            <button onClick={(e) => { handleLogout(e) }}> Logout</button>
        </div>
    )
}
export default HomePage;