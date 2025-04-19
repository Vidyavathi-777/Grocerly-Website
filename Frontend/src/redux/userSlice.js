import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id : "",
    name : "",
    email :"",
    avatar :"",
    mobile : "",
    verify_email : "",
    last_login_date : "",
    status : "",
    address_details : [],
    shopping_cart: [],
    orderHistory:[],
    role : "",
    

}

const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers :{
        setUserDetails : (state,action) =>{
            return {...state, ...action.payload}
        },
        logout : () =>{
            return {
                _id: "",
                name: "",
                email: "",
                avatar: "",
                mobile: "",
                verify_email: "",
                last_login_date: "",
                status: "",
                address_details: [],
                shopping_cart: [],
                orderHistory: [],
                role: "",
            }

        },
        updatedAvatar : (state,action) =>{
            state.avatar = action.payload
        }
    }
})

export const {setUserDetails,logout,updatedAvatar} = userSlice.actions

export default userSlice.reducer;