import React from "react";
import { useState } from "react";
import { BASE_URL, ENDPOINTS } from "../utils/urls";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../redux/actions/userAction";



const SignInForm = () => {


    const initalState = {
        email: "",
        password: ""
    }
    const disPatch = useDispatch();
    const [error, setError] = useState({});
    const [state, setState] = React.useState(initalState);
    const navigate = useNavigate();
    
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };
   

    const validation = (dataToSend) =>{
        if(dataToSend.email == "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter your email" }));
            return false;
        }
        if(dataToSend.password == ""){
            disPatch(openSnackBar({ severity: "error", message: "Please enter your password" }));
            return false;
        }
        return true;
    }

    const handleOnSubmit = async (evt, state) => {
        evt.preventDefault();
        const dataToSend = {
            email: state?.email,
            password: state?.password
        }

        const isValid = validation(dataToSend);
        if(!isValid){
            return;
        }


        const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        if (response.status == 200) {
            disPatch(openSnackBar({ severity: "success", message: "You Logged Successfully" }))
            const res = await response.json();

            disPatch(setUser({userId : res.user, cookie : response.cookie}));
            setState(initalState);
            navigate('/');
        }
        else {
            const errors = await response.json();
            setError(errors)
            if(errors?.email != "") disPatch(openSnackBar({ severity: "error", message: errors?.email }));
            else if (errors?.password != "") disPatch(openSnackBar({ severity: "error", message: errors?.password }));
        }

    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={(e) =>{handleOnSubmit(e,state)}}>
                <h1>Sign in</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                />
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;