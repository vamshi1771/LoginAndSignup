import def from "ajv/dist/vocabularies/discriminator";
import { BASE_URL, ENDPOINTS } from "../utils/urls";
import AxiosInstance from "../axios/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { openSnackBar } from "../redux/actions/snackbaractions";
import { useNavigate } from "react-router-dom";
import NavigateCard from "../components/NavigateCard";
import RestaurantLead from "../components/RestaurantLead";
import PocModal from "../modals/PocModal";
import InteractionModal from "../modals/InteractionModal";
import "./HomePage.css";



const HomePage = () => {
    const user = useSelector((state) => state.user);
    const disPatch = useDispatch();
    const navigate = useNavigate();
    const resturantLeadImage = "/resturant-image.jpg";
    const interactionImage = "/Interaction-image.jpg";
    const pocImage = "/Poc-image.jpg";
    const [openRestaurantModal, setOpenRestaurantModal] = React.useState(false);
    const [openPocModal, setOpenPocModal] = React.useState(false);
    const [openInteractionModal, setOpenInteractionModal] = React.useState(false);

    const handleOpenModal = (heading) =>{
      if(heading == 'Restaurant')  setOpenRestaurantModal(true);
      if(heading == 'Contact')  setOpenPocModal(true);
      if(heading == 'Interactions')  setOpenInteractionModal(true);
    }
    const handleCloseModal = (heading) =>{
      if(heading == 'Restaurant')  setOpenRestaurantModal(false);
      else if(heading == 'Contact')  setOpenPocModal(false);
        else if(heading == 'Interactions')  setOpenInteractionModal(false);
    }

    const axios = AxiosInstance({ user });

    const handleLogout = async (e) => {
        console.log(user)
        try {
            // const response = await axios.get(`${ENDPOINTS.LOGOUT}`);
            const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGOUT}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            disPatch(openSnackBar({ severity: "success", message: "Logged out Successfully" }));
        }
        catch (err) {
            disPatch(openSnackBar({ severity: "error", message: err.message }));
        }
        // axios.get('http://localhost:3000/logout', { withCredentials: true })
        //     .then(response => {
        //         console.log('Response:', response);
        //         // Cookies are automatically managed by the browser
        //         console.log("docuument", document.cookie)
        //     })
        //     .catch(error => console.error('Error:', error));
    }
        useEffect(() => {
            console.log("user", user);
        }, [user]);

    return (
        <div>
            <div className="cm-home-page">
                <img
                 className="cm-home-page-image position-relative "
                 src="/image1.jpg"
                    style={{
                        width: "100%",
                        height: "auto",
                        top:0,
                    }}>
                </img>
                <div className="cm-elements-on-image">
                    <h1 className="text-stone-50 font-bold">K A M</h1>
                    <h4 className="text-stone-50 font-semibold">Key Account Manager - Manage all your Restaurants at one place</h4>
                
                    <div className="d-flex cm-navigate-cards"> 
                        <NavigateCard ButtonName={"Add Resturant"}
                         heading={"Restaurant"}
                        content = {"Add new resturant to manage its performance"}
                        image ={resturantLeadImage}
                        handleOpenModal={handleOpenModal}
                        />
                        <RestaurantLead open={openRestaurantModal} handleClose={() => handleCloseModal('Restaurant')} />
                        <NavigateCard  ButtonName={"Add POC"} heading={"Contact"} content = {"Register contact details of Restaurant employees"} image ={pocImage} handleOpenModal={handleOpenModal}/>
                        <PocModal open={openPocModal} handleClose={() => handleCloseModal('Contact')}/>
                        <NavigateCard  ButtonName={"Interact"} heading={"Interactions"} content = {"Enter details of recent Interactions with Restaurants"} image ={interactionImage} handleOpenModal={handleOpenModal}/>
                        <InteractionModal open={openInteractionModal} handleClose={() => handleCloseModal('Interactions')}/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default HomePage;