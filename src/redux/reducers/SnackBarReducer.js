
import { OPEN_SNACKBAR,CLOSE_SNACKBAR } from "../actions/snackbaractions"

export const INITIAL_STATE={
    open :false,
    severity :'info',
    message:'',
}

const snackbarReducer=(state= INITIAL_STATE, action)=>{
    switch (action.type){
        case OPEN_SNACKBAR:
            return{
                ...action.payload,
                open:true,
               severity:action.payload.severity,
               message :action.payload.message,
            }
            case CLOSE_SNACKBAR:
                return {
                    ...state,
                    open: false,
                    message: '',
                    severity: 'info',
                  };
            default :
            return  state;
    }
}

export default snackbarReducer;