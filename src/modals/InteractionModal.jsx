import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { openSnackBar } from '../redux/actions/snackbaractions';
import useAxiosInstance from '../axios/axiosInterceptors';

const InteractionModal = ({ open, handleClose, InteractionData, restaurantLists }) => {

    const initialState = {
        restaurantId: InteractionData.restaurantId ? InteractionData.restaurantId : 0,
        pocId: 0,
        interactionType: "",
        interactedDate: "",
        interactionDetails: "",
        orderAmount: null,
        orderStatus: "",
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
    const [interaction, setInteraction] = React.useState(initialState);
    const [pocs, setPocs] = React.useState([]);
    const token = useSelector((state) => state.user.token);
    const axiosInstance = useAxiosInstance(token);
    const [restaurants, setRestaurants] = useState([]);
    const interactionTypes = ["ORDER", "CALL", "MEETING"];
    const orderStatus = ["Pending", "Completed", "Cancelled"];


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
        if (interaction.orderAmount === "" && interaction.interactionType === 'ORDER') {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Order Amount" }));
            return false;
        }
        if (interaction.orderStatus === "" && interaction.interactionType === 'ORDER') {
            disPatch(openSnackBar({ severity: "error", message: "Please enter Order Status" }));
            return false;
        }
        return true;
    }

    useEffect(() => {
        setRestaurants(restaurantLists);
    }, [restaurantLists]);


    const handleSubmitInteraction = async () => {
        const isValid = validateInteraction(interaction);
        if (!isValid) {
            return;
        }
        const dataToSend = {
            ...interaction,
            pocId: Number(interaction.pocId),
            interactedDate: interaction.interactedDate ? new Date(interaction.interactedDate).toISOString().split('T')[0] : '',
            orderDate: interaction.orderDate ? new Date(interaction.orderDate).toISOString().split('T')[0] : '',
            orderAmount: Number(interaction.orderAmount)
        }
        try {
            const res = await axiosInstance.post('/add-interaction', dataToSend);
            console.log(res.data);
            disPatch(openSnackBar({ severity: "success", message: "Interaction Added Successfully" }));
            setInteraction(initialState);
        } catch (error) {
            console.error(error);
        }
        setInteraction(initialState);
        handleClose();
    }

    const handleRestaurantSelection = async (e) => {
        e.preventDefault();
        const id = Number(e.target.value);
        try {
            const res = await axiosInstance.get(`/get-pocs/${id}`);
            setPocs(res.data);
            setInteraction(initialState);
        } catch (error) {
            console.error(error);
        }
        setInteraction({ ...interaction, restaurantId: id });
    }

    const handlePocChange = (e) => {
        const id = Number(e.target.value);
        setInteraction({
            ...interaction,
            pocId: id
        })
    }
    const handlecloseInteractionModal = () => {
        setInteraction(initialState);
        handleClose();
    }
    useEffect(() => {
        setInteraction(
            {
                ...interaction,
                restaurantId: InteractionData?.restaurantId,
            }
        )

    }, [InteractionData])

    return (
        <div className='mt-2'>
            <Modal
                open={open}
                onClose={() => { handlecloseInteractionModal() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='d-flex flex-col'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 className='text-rose-500 font-sans'>Add Interaction</h3>
                            <FontAwesomeIcon className='cm-pointer' onClick={() => { handlecloseInteractionModal() }} icon={faXmark} />
                        </div>
                        {InteractionData == null ?
                            <select value={interaction.restaurantId} onChange={handleRestaurantSelection}>
                                <option value={null} >Select Restaurant</option>
                                {restaurants?.map((restaurant) => <option key={restaurant.restaurantId} value={restaurant.restaurantId}>{restaurant.restaurantName}</option>)} </select>
                            : <input type="text" placeholder="Restaurant Name" value={InteractionData.restaurantName} disabled />
                        }
                        <select value={interaction.pocId} onChange={handlePocChange}>
                            {(pocs.length === 0 && InteractionData.restaurantPocs.length == 0) ? <option value=" "> No Pocs Registered </option> : <option value="">Select Poc</option>}
                            {InteractionData == null ?
                                (pocs?.map((poc) => <option key={poc.pocId} value={poc.pocId}>{poc.pocName}</option>))
                                : (InteractionData.restaurantPocs.map((poc) => <option key={poc.pocId} value={poc.pocId}>{poc.pocName}</option>))}
                        </select>
                        <select value={interaction.interactionType} onChange={(e) => setInteraction({ ...interaction, interactionType: e.target.value })}>
                            <option value="">Select Role</option>
                            {interactionTypes.map((role) => <option key={role} value={role}>{role}</option>)} </select>
                        <input type="text" placeholder="Interaction Details" value={interaction.interactionDetails} onChange={(e) => setInteraction({ ...interaction, interactionDetails: e.target.value })} />
                        {/* <input type="date" placeholder="Order Date" value={interaction.orderDate} onChange={(e) => setInteraction({ ...interaction, orderDate: e.target.value })} /> */}
                        <input type="date" placeholder="Interactio Date"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            value={interaction.interactedDate} onChange={(e) => setInteraction({ ...interaction, interactedDate: e.target.value })} />
                        {interaction.interactionType === 'ORDER' && <input type="Number" placeholder="Order Amount" value={interaction.orderAmount} onChange={(e) => setInteraction({ ...interaction, orderAmount: e.target.value })} />}
                        {interaction.interactionType === 'ORDER' && <select value={interaction.orderStatus} onChange={(e) => setInteraction({ ...interaction, orderStatus: e.target.value })}>
                            <option value="">Select Order Status</option>
                            {orderStatus.map((role) => <option key={role} value={role}>{role}</option>)} </select>}
                        <button onClick={handleSubmitInteraction} className='mt-2'>Add Interaction</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default InteractionModal;