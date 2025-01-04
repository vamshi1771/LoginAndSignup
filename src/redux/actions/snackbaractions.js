export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const openSnackBar=(payload)=>({
    type:OPEN_SNACKBAR,
    payload
})

export const closeSnackBar=()=>({
    type:CLOSE_SNACKBAR,
})