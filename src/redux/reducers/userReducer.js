import { SET_USER,CLEAR_USER } from "../types/userTypes"

export const INITIAL_STATE={
    userId : null,
    userName : "",
    email : "",
    role : "",
    token : ""
}

const userReducer=(state= INITIAL_STATE, action)=>{
    switch (action.type){
        case SET_USER:
            console.log("set user done")
            console.log(action.payload.userId)
            return{
                ...state,
               userId : action.payload.userId,
               userName : action.payload.userName,
               email : action.payload.email,
               token : action.payload.token,
               role : action.payload.role,
            }
            case CLEAR_USER:
                console.log("clear user done")
            return{
                ...INITIAL_STATE
            }
            default :
            console.log("default user done")
            return  state ;
    }
}

export default userReducer;