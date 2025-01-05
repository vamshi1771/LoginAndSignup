import React from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { openSnackBar } from '../redux/actions/snackbaractions';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import useAxiosInstance from '../axios/axiosInterceptors';
import { BASE_URL } from '../utils/urls';

const RestaurantLead = ({ open, handleClose }) => {

    const initalState = {
        restaurantName: "",
        location: "",
        restaurantType: "",
        callFrequency: null,
    }
    const addRegister = '/register-restaurant';
    const userId = useSelector((state) => state.user.userId);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const axiosInstance = useAxiosInstance(token);
    const [restaurantLeads, setRestaurantLeads] = React.useState(initalState);
    const restaurantTypes = ["Italian", "Chinese", "Ethnic Restaurants", "Fine Dining", "Casual Dining", "Japanese", "Fast Food", "Buffet", " Cafés and Coffeehouses", "American"]
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
    const validateRestaurantLead = () => {
        if (restaurantLeads.restaurantName == "") {
            dispatch(openSnackBar({ severity: "error", message: "Please enter Restaurant Name" }));
            return false;
        }
        if (restaurantLeads.location == "") {
            dispatch(openSnackBar({ severity: "error", message: "Please enter Restaurant Location" }));
            return false;
        }
        if (restaurantLeads.restaurantType == "") {
            dispatch(openSnackBar({ severity: "error", message: "Please enter Restaurant Type" }));
            return false;
        }
        return true;
    }
    const handleCloseRestaurantLead = () => {
        handleClose();
        setRestaurantLeads(initalState);
    }

    const handleSubmitRestaurantLead = async() => {
        const isValid = validateRestaurantLead();
        if (!isValid) {
            return;
        }
        
        try {
            const res = await axiosInstance.post('/register-restaurant', restaurantLeads);
            if (res.status === 200) {
                dispatch(openSnackBar({severity: 'success', message: "Restaurant Registered Sucessfully"}))
              }
        } catch (error) {
            console.log("error", error)
        }
        handleClose();
        setRestaurantLeads(initalState);
    }
    
    

    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='d-flex flex-col'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 className='text-rose-500 font-sans'>Add Restaurant</h3>
                            <FontAwesomeIcon className='cm-pointer' onClick={handleCloseRestaurantLead} icon={faXmark} />
                        </div>
                        <input type="text" placeholder="Restaurant Name" value={restaurantLeads.restaurantName} onChange={(e) => setRestaurantLeads({ ...restaurantLeads, restaurantName: e.target.value })} />
                        <input type="text" placeholder="Location" value={restaurantLeads.location} onChange={(e) => setRestaurantLeads({ ...restaurantLeads, location: e.target.value })} />
                        <input type="Number" placeholder="Call Frequency" value={restaurantLeads.callFrequency} onChange={(e) => setRestaurantLeads({ ...restaurantLeads, callFrequency: e.target.value })} />    
                        <select value={restaurantLeads.restaurantType} onChange={(e) => setRestaurantLeads({ ...restaurantLeads, restaurantType: e.target.value })}>
                            <option value="" disabled>Select a restaurant type</option>
                            {restaurantTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <button onClick={handleSubmitRestaurantLead} className='mt-2'>Add Restaurant</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default RestaurantLead;