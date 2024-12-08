import React, { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import {Button} from '@mui/material';
import { useSelector } from "react-redux";
import SignInForm from "./Signin";
import SignUpForm from "./Signup";
import "./auth.css";

const Login = () => {

  const user = useSelector((state) => state.user.userId);
    const initialState ={
        email : "",
        password : "",
    }
    const initialError ={
      email : "",
      password : "",
  }
    const [users,setUser] = useState(initialState);
    const [errors,setErrors] = useState(initialError);
    const handleNameChange =(e) =>{

    }

    const handleLogin = () =>{

    }
    const [type, setType] = useState("signIn");
    const handleOnClick = text => {
      if (text !== type) {
        setType(text);
        return;
      }
    };
    const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
    React.useEffect(()=>{
      console.log("user" + user);
    },[user])
  return (
    <div className="App">
    {/* <h2 className="text-indigo-900">Sign in/up Form</h2> */}
    <div className={containerClass} id="container">
      <SignUpForm />
      <SignInForm />
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="ghost"
              id="signIn"
              onClick={() => handleOnClick("signIn")}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              className="ghost "
              id="signUp"
              onClick={() => handleOnClick("signUp")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;