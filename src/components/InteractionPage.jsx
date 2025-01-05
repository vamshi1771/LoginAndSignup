import React, { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InteractionModal from '../modals/InteractionModal';
import './Components.css';
import { useSelector } from 'react-redux';
import useAxiosInstance from '../axios/axiosInterceptors';
const InteractionPage = () => {

    const Data = [
        { restaurantId: 1, restaurantName: 'Restaurant A', lastCallDate: '2023-10-01', callFrequency: 'Weekly' },
        { restaurantId: 2, restaurantName: 'Restaurant B', lastCallDate: '2023-10-02', callFrequency: 'Monthly' },
        { restaurantId: 3, restaurantName: 'Restaurant C', lastCallDate: '2023-10-03', callFrequency: 'Daily' },
    ];

    const [interactionData, setInteractionData] = useState([]);
    const token = useSelector((state) => state.user.token);
    const [openInteractionModal, setOpenInteractionModal] = React.useState(false);
    const [currentInteractionData, setCurrentInteractionData] = useState(null);
    const axiosInstance = useAxiosInstance(token);
    const [panelData, setPanelData] = useState(null);
    const handleOpenModal = (data) => {
        setPanelData(data);
        setOpenInteractionModal(true);
    }
    const handleCloseModal = () => setOpenInteractionModal(false);

    useEffect(()=>{
        fetchRestaurants();
    },[])

    const fetchRestaurants = async () => {
        try {
            const response = await axiosInstance.get('get-today-interactions');
            if (response.status == 200) {
                setCurrentInteractionData(response.data);
            }
        }
        catch(e){
            console.log(e);
        }
  }

    return (
        <div className='cm-interaction-page'>
            <img src="/interaction-page-image.jpg" alt="This is a image"
                style={{
                    width: "100%",
                    height: "60vh",
                }} />

            <TableContainer className="cm-Table-container" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead className="table-head fw-medium cm-sm-txt">
                        <TableRow>
                            <TableCell className="text-blue-gray-700" align="center">Restaurant Id</TableCell>
                            <TableCell className="text-blue-gray-700 fw-medium cm-sm-txt" align="center">Restaurant Name</TableCell>
                            <TableCell className="text-blue-gray-700" align="center">Last Call Date</TableCell>
                            <TableCell className="text-blue-gray-700" align="center">Call Frequency</TableCell>
                            <TableCell className="text-blue-gray-700" align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentInteractionData?.map((data) => (
                            <TableRow key={data.restaurantId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row" align="center">{data.restaurantId}</TableCell>
                                <TableCell align="center">{data.restaurantName}</TableCell>
                                <TableCell align="center">{data.lastInteractedDate}</TableCell>
                                <TableCell align="center">{data.callFrequency} </TableCell>
                                <TableCell align="center">
                                    <button onClick={() => handleOpenModal(data)} variant="contained">Interact</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <InteractionModal open={openInteractionModal} handleClose={handleCloseModal} InteractionData={panelData} />
        </div>
    );
};

export default InteractionPage;