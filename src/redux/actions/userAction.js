
import { SET_USER, CLEAR_USER } from "../types/userTypes";

export const setUser=(data)=>({
    type:SET_USER,
    payload:data
})

export const clearUser=(data)=>({
    type:CLEAR_USER,
})