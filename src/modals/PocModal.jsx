import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { openSnackBar } from '../redux/actions/snackbaractions';
import useAxiosInstance from '../axios/axiosInterceptors';
import { clearUser } from '../redux/actions/userAction';
import { useSelector } from 'react-redux';

const PocModal = ({ open, handleClose,restaurants }) => {

    const initialState = {
        pocName: "",
        role: "",
        contactNumber: "",
        emailAddress: "",
        restaurantId: ""
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const roles = ["Owner", "Manager", "Chef", "Waiter",];
    const user = useSelector((state) => state.user);
    const token = user?.token;
    const axiosInstance = useAxiosInstance(token);
    const [poc, setPoc] = React.useState(initialState);
    const disPatch = useDispatch();


    
   

    const validatePoc = (poc) => {
        if (poc.pocName === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter poc Name" }));
            return false;
        }
        if (poc.role === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Poc Role" }));
            return false;
        }
        if (poc.contactNumber === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Poc Contact Number" }));
            return false;
        }
        if (poc.emailAddress === "" && !poc.emailAddress.includes('@')) {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Poc Email Address" }));
            return false;
        }
        if (poc.restaurantId === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please select Restaurant" }));
            return false;
        }
        return true;
    }

    // useEffect(()=>{
    //     disPatch(clearUser());
    // },[])



    const handleSubmitPoc = async () => {   
        const isValid =  validatePoc(poc);  
        if (!isValid) {
            return;
        }

        try {
            const res = await axiosInstance.post('/register-poc', poc);
            if(res.status == 200){
                disPatch(openSnackBar({severity: 'success', message: "Poc Registered Sucessfully"}))
            } 
        } catch (error) {
            disPatch(openSnackBar({severity: 'error', message: "Something went wrong"}))
            console.error(error);
        }
        handleClose();
        setPoc(initialState);
    }

    const handleCloseModal = () => {
        handleClose();
        setPoc(initialState);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='d-flex flex-col'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 className='text-rose-500 font-sans'>Add Poc</h3>
                            <FontAwesomeIcon className='cm-pointer' onClick={handleCloseModal} icon={faXmark} />
                        </div>
                        <select value={poc.role} onChange={(e) => setPoc({ ...poc, role: e.target.value })}>
                            <option value="">Select Role</option>
                            {roles.map((role) => <option key={role} value={role}>{role}</option>)} </select>
                        <input type="text" placeholder="Poc Name" value={poc.pocName} onChange={(e) => setPoc({ ...poc, pocName: e.target.value })} />
                        <input type="text" placeholder="Contact Number" value={poc.contactNumber} onChange={(e) => setPoc({ ...poc, contactNumber: e.target.value })} />
                        <input type="text" placeholder="Email Address" value={poc.emailAddress} onChange={(e) => setPoc({ ...poc, emailAddress: e.target.value })} />
                         <select value={poc.restaurantId} onChange={(e) => setPoc({ ...poc, restaurantId: e.target.value })}>
                            <option value="">Select Restaurant</option>
                            {restaurants.map((restaurant) => <option key={restaurant.restaurantId} value={restaurant.restaurantId}>{restaurant.restaurantName}</option>)} </select> 
                        <button onClick={handleSubmitPoc} className='mt-2'>Add Restaurant</button>
                    </div>
                </Box>
            </Modal>

        </div>
    );
};

export default PocModal;