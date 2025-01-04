import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { openSnackBar } from '../redux/actions/snackbaractions';
import useAxiosInstance from '../axios/axiosInterceptors';

const InteractionModal = ({open,handleClose,InteractionData}) => {
   
    const initialState = {
        restaurantId : InteractionData ? InteractionData.restaurantId : "",
         pocId : "",
         interactionType : "",
         interactedDate : "",
          interactionDetails : "",
         orderDate : "",
         orderAmount : "",
         orderStatus : "",
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


    const disPatch = useDispatch();
    const axiosInstance = useAxiosInstance();
    const [interaction, setInteraction] = React.useState(initialState);
    const [restaurants, setRestaurants] = React.useState([]);
    const [pocs, setPocs] = React.useState([]);
    

    const handleRestaurantSelection = async(e) => {
        setInteraction({...interaction,restaurantId:e.target.value})
        try {
            const res = await axiosInstance.get(`/get-pocs/${e.target.value}`);
            setPocs(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const validateInteraction = (interaction) => {
        if (interaction.restaurantId === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please select Restaurant" }));
            return false;
        }
        if (interaction.pocId === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please select Poc" }));
            return false;
        }
        if (interaction.interactionType === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Interaction Type" }));
            return false;
        }
        if (interaction.interactedDate === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Interacted Date" }));
            return false;
        }
        if (interaction.interactionDetails === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Interaction Details" }));
            return false;
        }
        if (interaction.orderDate === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Order Date" }));
            return false;
        }
        if (interaction.orderAmount === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Order Amount" }));
            return false;
        }
        if (interaction.orderStatus === "") {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Order Status" }));
            return false;
        }
        return true;
    }


    const handleSubmitInteraction = async() => {
        const isValid = validateInteraction(interaction);
        if (!isValid) {
            return;
        }

        try {
            const res = await axiosInstance.post('/add-interaction', interaction);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
        disPatch(openSnackBar({ severity: "success", message: "Interaction Added Successfully" }));
        handleClose();
    }


    return (
        <div className='mt-2'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='d-flex flex-col'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 className='text-rose-500 font-sans'>Add Interaction</h3>
                            <FontAwesomeIcon className='cm-pointer' onClick={handleClose} icon={faXmark} />
                        </div>
                        <select value={interaction.restaurantId} onChange={(e) => setInteraction({ ...interaction, restaurantId: e.target.value })}>
                            <option value="">Select Restaurant</option>
                            {restaurants.map((restaurant) => <option key={restaurant.id} value={restaurant.id}>{restaurant.restaurantName}</option>)} </select>
                        <select value={interaction.pocId} onChange={(e) => setInteraction({ ...interaction, pocId: e.target.value })}>
                            <option value="">Select Poc</option>
                            {pocs.map((poc) => <option key={poc.id} value={poc.id}>{poc.pocName}</option>)} </select>
                        <input type="text" placeholder="Interaction Type" value={interaction.interactionType} onChange={(e) => setInteraction({ ...interaction, interactionType: e.target.value })} />
                        <input type="text" placeholder="Interaction Details" value={interaction.interactionDetails} onChange={(e) => setInteraction({ ...interaction, interactionDetails: e.target.value })} />
                        <input type="date" placeholder="Order Date" value={interaction.orderDate} onChange={(e) => setInteraction({ ...interaction, orderDate: e.target.value })} />
                        <input type="text" placeholder="Order Amount" value={interaction.orderAmount} onChange={(e) => setInteraction({ ...interaction, orderAmount: e.target.value })} />
                        <input type="text" placeholder="Order Status" value={interaction.orderStatus} onChange={(e) => setInteraction({ ...interaction, orderStatus: e.target.value })} />
                        <button onClick={handleSubmitInteraction} className='mt-2'>Add Interaction</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default InteractionModal;