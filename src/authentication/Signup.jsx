import React, { useState } from "react";
import { ENDPOINTS, BASE_URL } from "../utils/urls";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const SignUpForm = () => {

    const initalState = {
        firstName: "",
        email: "",
        password: ""
    }
    const [state, setState] = React.useState(initalState);
    const disPatch = useDispatch();
    const [error,setError] = useState({}); 
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };
    const validation = (dataToSend) =>{
        if(dataToSend.firstName == ""){
            disPatch(openSnackBar({ severity: "error", message: "Please enter Name" }));
            return false;
        }
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
    const handleOnSubmit = async (e, state) => {
        e.preventDefault();

        const lastName = " user";
        const dataToSend = {
            firstName: state?.firstName,
            lastName: lastName,
            email: state?.email,
            password: state?.password
        }
        const isValid = validation(dataToSend);
        if(!isValid){
            return;
        }
        const response = await fetch(`${BASE_URL}${ENDPOINTS.REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        if(response.status == 201){
            disPatch(openSnackBar({ severity: "success", message: "You signed up Successfully" }))
            setState(initalState);
            <Navigate to ="/" />
        }
        else {
            const errors = await response.json();
            setError(errors)
                console.log(errors)
            if(errors?.email != "") disPatch(openSnackBar({ severity: "error", message: errors?.email }));
            else if (errors?.password != "") disPatch(openSnackBar({ severity: "error", message: errors?.password }));
 
        }
    };

    return (
        <div className="form-container sign-up-container">
            <form onSubmit={(e) => handleOnSubmit(e, state)}>
                <h1>Create Account</h1>
                <input
                    type="text"
                    name="firstName"
                    value={state.firstName}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <button >Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
