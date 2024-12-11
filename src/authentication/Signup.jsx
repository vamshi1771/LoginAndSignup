import React, { useState } from "react";
import { ENDPOINTS, BASE_URL } from "../utils/urls";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setUser } from "../redux/actions/userAction";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUpForm = () => {

    const initalState = {
        firstName: "",
        email: "",
        password: ""
    }
    const [state, setState] = React.useState(initalState);
    const disPatch = useDispatch();
    const [error, setError] = useState({});
    const [isVisabale, setIsVisable] = useState(false);
    const [checked,setChecked] = useState(false);
    const navigate = useNavigate();
    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    };

    const handleCheckAdmin = (checked) => {
        setState({
            ...state,
            ["role"]: checked ? "ADMIN" : "USER"
        })
    }
    const validation = (dataToSend) => {
        if (dataToSend.firstName == "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Name" }));
            return false;
        }
        if (dataToSend.email == "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter your email" }));
            return false;
        }
        if (dataToSend.password == "") {
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
            password: state?.password,
            role : checked ? "ADMIN" : "USER"
        }
        const isValid = validation(dataToSend);
        if (!isValid) {
            return;
        }
        const response = await fetch(`${BASE_URL}${ENDPOINTS.REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        if (response.status == 201) {
            const res = await response.json();
            disPatch(setUser({
                userId: res._id, role: res.role, userName: res.userName,
                email: res.email
            }));
            setState(initalState);
            navigate('/');
        }
        else {
            const errors = await response.json();
            setError(errors)
            console.log(errors)
            if (errors?.email != "") disPatch(openSnackBar({ severity: "error", message: errors?.email }));
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
                <div className="cm-password">
                    <input
                        type={!isVisabale ? "password" : "text"}
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    {!isVisabale ? <FontAwesomeIcon onClick={() => setIsVisable(true)} className="cm-eye-icon cm-pointer" icon={faEye} />
                        : <FontAwesomeIcon onClick={() => setIsVisable(false)} className="cm-eye-icon cm-pointer" icon={faEyeSlash} />}
                </div>
                <div class="checkbox-container">
                    <input onClick={()=>{setChecked(!checked)}} type="checkbox" id="terms" />
                    <label for="terms">Register as  Admin</label>
                </div>
                <button >Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
