import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RestaurantLead from './RestaurantLead';


const NavigateCard = ({ ButtonName, heading, content, image,handleOpenModal }) => {
  
    

    return (
        <div>
            <Card sx={{ minWidth: 275, maxHeight: 500 }} >
                <CardContent>
                    <img src={image} alt="Sample"
                        style={{
                            height: "200px",
                            width: "auto", 
                            minWidth: "100%" 
                        }} />
                    <h3>{heading}</h3>
                    <p className='m-1'>{content}</p>
                </CardContent>
                <CardActions className='d-flex justify-center'>
                    <button onClick={()=>{handleOpenModal(heading)}} >{ButtonName}</button>
                </CardActions>
            </Card>
        </div>
    );
};

export default NavigateCard;