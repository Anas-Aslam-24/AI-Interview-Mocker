import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
    }
})

const { setUser } = authSlice.actions;

export default authSlice.reducer;