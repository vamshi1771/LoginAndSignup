import def from "ajv/dist/vocabularies/discriminator";
import { BASE_URL, ENDPOINTS } from "../utils/urls";
import AxiosInstance from "../axios/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { useNavigate } from "react-router-dom";
import NavigateCard from "../components/NavigateCard";
import RestaurantLead from "../components/RestaurantLead";
import PocModal from "../modals/PocModal";
import InteractionModal from "../modals/InteractionModal";
import "./HomePage.css";
import useAxiosInstance from "../axios/axiosInterceptors";



const HomePage = () => {


    const token = useSelector((state) => state.user.token);
    const axiosInstance = useAxiosInstance(token);
    const user = useSelector((state) => state.user);
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const resturantLeadImage = "/resturant-image.jpg";
    const interactionImage = "/Interaction-image.jpg";
    const pocImage = "/Poc-image.jpg";
    const [openRestaurantModal, setOpenRestaurantModal] = React.useState(false);
    const [openPocModal, setOpenPocModal] = React.useState(false);
    const [openInteractionModal, setOpenInteractionModal] = React.useState(false);
    const [restaurants, setRestaurants] = useState([]);


    useEffect(()=>{
        fetchRestaurants();
    },[]);
    
    const handleOpenModal = (heading) => {
            fetchRestaurants();
        if (heading == 'Restaurant') setOpenRestaurantModal(true);
        if (heading == 'Contact') setOpenPocModal(true);
        if (heading == 'Interactions') setOpenInteractionModal(true);
    }


    const fetchRestaurants = async () => {
        try {
            const response = await axiosInstance.get('/get-restaurants');
            if (response.status === 200) {
                setRestaurants(response.data);
            } else {
                disPatch(openSnackBar({ severity: 'error', message: response.data.message }));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseModal = (heading) => {
        if (heading == 'Restaurant') setOpenRestaurantModal(false);
        else if (heading == 'Contact') setOpenPocModal(false);
        else if (heading == 'Interactions') setOpenInteractionModal(false);
    }

    const axios = AxiosInstance({ user });

   

    return (
        <div>
            <div className="cm-home-page">
                <img
                    className="cm-home-page-image position-relative "
                    src="/image1.jpg"
                    style={{
                        width: "100%",
                        height: "auto",
                        top: 0,
                    }}>
                </img>
                <div className="cm-elements-on-image">
                    <h1 className="text-stone-50 font-bold">K A M</h1>
                    <h4 className="text-stone-50 font-semibold">Key Account Manager - Manage all your Restaurants at one place</h4>

                    <div className="d-flex cm-navigate-cards">
                        <NavigateCard ButtonName={"Add Resturant"}
                            heading={"Restaurant"}
                            content={"Add new resturant to manage its performance"}
                            image={resturantLeadImage}
                            handleOpenModal={handleOpenModal}
                        />
                        <RestaurantLead open={openRestaurantModal} handleClose={() => handleCloseModal('Restaurant')} />
                        <NavigateCard ButtonName={"Add POC"} heading={"Contact"} content={"Register contact details of Restaurant employees"} image={pocImage} handleOpenModal={handleOpenModal} />
                        <PocModal open={openPocModal} handleClose={() => handleCloseModal('Contact')} restaurants = {restaurants}/>
                        <NavigateCard ButtonName={"Interact"} heading={"Interactions"} content={"Enter details of recent Interactions with Restaurants"} image={interactionImage} handleOpenModal={handleOpenModal} />
                        <InteractionModal open={openInteractionModal} handleClose={() => handleCloseModal('Interactions')} restaurantLists = {restaurants} />
                    </div>

                </div>
            </div>
        </div>
    );
}
export default HomePage;