import { SET_USER,CLEAR_USER } from "../types/userTypes"

export const INITIAL_STATE={
    type:'',
    userId : "",
    userName : "",
    email : "",
    role : "",
    cookie : ""
}

const userReducer=(state= INITIAL_STATE, action)=>{
    switch (action.type){
        case SET_USER:
            return{
                ...state,
               userId : action.payload.userId,
               userName : action.payload.userName,
               email : action.payload.email,
               cookie : action.payload.cookie,
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