import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../redux/actions/snackbaractions";
import "../App.css";


const SnackBar = () => {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, OPEN } = state;
    const dispatch = useDispatch();
    const { open,severity,message } = useSelector((state) => state.snackbar);

    const handleClose = () => {
        dispatch(closeSnackBar());
    }

    return (
        <>
            <Snackbar className="cm-snackbar" open={open} sx={{ width: "100%" }}
                    anchorOrigin={{
                       vertical: "top",
                       horizontal: "center"
                    }} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    
                    severity={severity}
                    variant="filled"
                    transitioncomponent="Fade"
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
export default SnackBar;