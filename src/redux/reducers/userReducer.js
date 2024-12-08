import { SET_USER,CLEAR_USER } from "../types/userTypes"

export const INITIAL_STATE={
    type:'',
    userId : "",
    userName : "",
    email : "",
    cookie : "",
    role : ""
}

const userReducer=(state= INITIAL_STATE, action)=>{
    switch (action.type){
        case SET_USER:
            return{
                ...state,
               userId : action.payload.userId,
               cookie : action.payload.cookie,
               userName : action.payload.userName,
               email : action.payload.email,
               role : action.payload.role,
            }
            case CLEAR_USER:
            return{
                ...INITIAL_STATE
            }
            default :
            return  INITIAL_STATE;
    }
}

export default userReducer;