import React from "react";
import { useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./Header.css"

const Header = () => {

    const user = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="cm-header bg-blue-varient d-flex justify-between align-middle">
            <div className="d-flex gap-4">
                <h1 className="text-yellow-500 ms-4 pt-1">Udaan</h1>
                <div className="cm-menu position-relative">
                    <div className="cm-menu-items ml-4">
                    <h4 className="text-white font-sans pt-3 cm-pointer">Home</h4>
                    <h4 className="text-white font-sans pt-3 cm-pointer">Restaurants</h4>
                    <h4 className="text-white font-sans pt-3 cm-pointer">Interactions</h4>
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
                        >
                            <MenuItem onClick={handleClose}>Home</MenuItem>
                            <MenuItem onClick={handleClose}>Restaurants</MenuItem>
                            <MenuItem onClick={handleClose}>Interactions</MenuItem>
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
                        <FontAwesomeIcon onClick={() => { }} className="cm-pointer" icon={faUser} size="xl" style={{ color: "#12a4ed", }} />                </div>
                </div>
            </div>
        </div>
    )

}

export default Header