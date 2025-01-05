import React from "react";
import { useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useAxiosInstance from "../axios/axiosInterceptors";
import { ENDPOINTS } from "../utils/urls";
import { BASE_URL } from "../utils/urls";

import { useDispatch } from "react-redux";
import { clearUser } from "../redux/actions/userAction";
import { openSnackBar } from "../redux/actions/snackbaractions";
import "./Header.css"

const Header = () => {

    const user = useSelector((state) => state.user);
    const token = user?.token;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
    const axiosInstance = useAxiosInstance(token);
    const open = Boolean(anchorEl);
    const openProfile = Boolean(profileAnchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };
    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    const Navigate = useNavigate();
    const disPatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = (e) => {
        setIsProfileOpen(!isProfileOpen);
        handleProfileClick(e);
    };

    const handleLogout = async (e) => {
        try {
                  const response = await axiosInstance.get(ENDPOINTS.LOGOUT);            
                  if (response.status === 200) {
                    disPatch(openSnackBar({ severity: "success", message: "Logout Successfully" }));
                    disPatch(clearUser());
                    Navigate('/login');
                  } else {
                    const errors = await response.json();
                    if (errors?.email) {
                      disPatch(openSnackBar({ severity: "error", message: errors.email }));
                    } else if (errors?.password) {
                      disPatch(openSnackBar({ severity: "error", message: errors.password }));
                    }
                  }
                } catch (error) {
                  console.error('Logout failed:', error);
                  disPatch(openSnackBar({ severity: "error", message: "Logout failed" }));
                }
            
    }

    return (
        <div className="cm-header bg-blue-varient d-flex justify-between align-middle z-1">
            <div className="d-flex gap-4">
                <h1 className="text-yellow-500 ms-4 pt-1">Udaan</h1>
                <div className="cm-menu position-relative">
                    <div className="cm-menu-items ml-4">
                        <h4 onClick={() => { Navigate('/') }} className="text-white font-sans pt-3 cm-pointer">Home</h4>
                        <h4 className="text-white font-sans pt-3 cm-pointer">Restaurants</h4>
                        <h4 onClick={() => { Navigate('/interactions') }} className="text-white font-sans pt-3 cm-pointer">Interactions</h4>
                        <h4 onClick={() => { Navigate('/analytics') }} className="text-white font-sans pt-3 cm-pointer">Analytics </h4>
                    </div>
                    <div className="cm-menu-bar position-absolute">
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <div className="menu-toggle-icon mt-1 " onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faBars} size="2xl" style={{ color: "#dbe5f5", }} />
                            </div>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            sx={{zIndex:9999}}
                        >
                            <MenuItem onClick={handleClose}>Home</MenuItem>
                            <MenuItem onClick={handleClose}>Restaurants</MenuItem>
                            <MenuItem onClick={() => { Navigate('/get-interactions') }}>Interactions</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="cm-user-account">
                <div className="cm-account">
                    <h5 className="text-white">{user.userName}</h5>
                    <h6 className="text-white cm-account-role"> {user.role != null ? user.role : "User"}</h6>
                </div>
                <div>
                    <div className="icon-wrapper" style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "12px",
                        borderRadius: "50%",
                        backgroundColor: "#ffff",
                    }}>
                        <FontAwesomeIcon onClick={(e) => {toggleProfile(e)}} className="cm-pointer" icon={faUser} size="xl" style={{ color: "#12a4ed", }} />
                       </div>
                </div>
                <Menu
                    id="basic-menu"
                    anchorEl={profileAnchorEl}
                    open={openProfile}
                    onClose={handleProfileClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem className="text-amber-400" onClick={handleProfileClose}>Profile</MenuItem>
                    <MenuItem>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )

}

export default Header