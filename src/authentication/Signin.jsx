import React from "react";
import { useState } from "react";
import { BASE_URL, ENDPOINTS } from "../utils/urls";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';




const SignInForm = () => {


    const initalState = {
        email: "",
        password: ""
    }
    const dispatch = useDispatch();
    const [error, setError] = useState({});
    const [state, setState] = React.useState(initalState);
    const [isVisabale,setIsVisable] =useState(false);
    const navigate = useNavigate();
    
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };
   

    const validation = (dataToSend) =>{
        if(dataToSend.userName == "") {
            dispatch(openSnackBar({ severity: "error", message: "Please enter your email" }));
            return false;
        }
        if(dataToSend.password == ""){
            dispatch(openSnackBar({ severity: "error", message: "Please enter your password" }));
            return false;
        }
        return true;
    }

    // const handleOnSubmit = async (evt, state) => {
    //     evt.preventDefault();
    //     const dataToSend = {
    //         userName: state?.email,
    //         password: state?.password
    //     }

    //     const isValid = validation(dataToSend);
    //     if(!isValid){
    //         return;
    //     }


    //     const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(dataToSend),
    //     })
    //     const token = response.headers['authorization'];
    //   console.log("token", token);
    //   if (token) {
    //     const jwtToken = token.split(' ')[1]; // Extract the token part
    //     console.log("jwtToken", jwtToken);
    //     Cookies.set('jwt_token', jwtToken, { expires: 7, path: '/' }); // Set the token in the cookie, expires in 7 days
    //   }
    //     if (response.status == 200) {
    //         dispatch(openSnackBar({ severity: "success", message: "You Logged Successfully" }))
    //         const res = await response.json();

    //         dispatch(setUser({userId : res.user_id, role : res.role, userName : res.userName,email : res.email}));
    //         setState(initalState);
    //         navigate('/');
    //     }
    //     else {
    //         const errors = await response.json();
    //         setError(errors)
    //         if(errors?.email != "") dispatch(openSnackBar({ severity: "error", message: errors?.email }));
    //         else if (errors?.password != "") dispatch(openSnackBar({ severity: "error", message: errors?.password }));
    //     }

    // };

    const handleOnSubmit = async (event,state) => {
        event.preventDefault();
        const dataToSend = {
                    userName: state?.email,
                    password: state?.password
                }
        const isValid = validation(dataToSend);
        if (!isValid) {
          return;
        }
    
        try {
          const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });
    
          if (response.status === 200) {
            dispatch(openSnackBar({ severity: "success", message: "You Logged Successfully" }));
            const res = await response.json();
            dispatch(setUser({ userId: res.userId, role: res.role, userName: res.userName, email: res.email,token : res.token }));
            setState(initalState);
            navigate('/');
          } else {
            const errors = await response.json();
            setError(errors);
            if (errors?.email) {
              dispatch(openSnackBar({ severity: "error", message: errors.email }));
            } else if (errors?.password) {
              dispatch(openSnackBar({ severity: "error", message: errors.password }));
            }
          }
        } catch (error) {
          console.error('Login failed:', error);
          dispatch(openSnackBar({ severity: "error", message: "Login failed" }));
        }
      };


    return (
        <div className="form-container sign-in-container">
            <form onSubmit={(e) =>{handleOnSubmit(e,state)}}>
                <h1>Sign in</h1>
                <input
                    type="text"
                    placeholder="User Name"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <div  className="cm-password">
                <input
                    type={!isVisabale ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
                 {!isVisabale ? <FontAwesomeIcon  onClick={()=>setIsVisable(true)} className="cm-eye-icon cm-pointer" icon={faEye} />
                  : <FontAwesomeIcon onClick={()=>setIsVisable(false)} className="cm-eye-icon cm-pointer" icon={faEyeSlash} /> }
                  </div>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;
