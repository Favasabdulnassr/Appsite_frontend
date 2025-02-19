import  {createAsyncThunk,createSlice, isRejectedWithValue}   from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../services/constant'
import { act } from 'react'



const initialState = {
    first_name:null,
    last_name:null,
    loader:false,
    isAuthenticated:false,
    error:null,
    role:null,
    email:null,
    phone_number:null
}


export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async(logindata,{rejectWithValue}) =>{
        try {
            const response = await axios.post(`${BASE_URL}/token/`,logindata);
            console.log('Token received',response.data)

            const token =  response.data;

            const tokens = {access:token.access, refresh:token.refresh};
            localStorage.setItem('authTokens',JSON.stringify(tokens));
            console.log('Tokens stored in localStorage:', tokens);

            const decodeToken = JSON.parse(atob(token.access.split('.')[1]));

            const {role,email,first_name,phone_number,last_name } = decodeToken;

            return { role,email,first_name,phone_number,last_name};


            
        } catch (error) {
            console.error('ssssssuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuui',error)
            return rejectWithValue(error?.message || 'soemthing went wrong');
            
        }
    }
)




const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        logout(state,action){
            state.first_name = null,
            state.last_name = null,
            state.loader = false,
            state.isAuthenticated = false,
            state.error = null,
            state.role = null,
            state.email = null,
            state.phone_number = null,

            localStorage.removeItem('authTokens');
            

        },
    },
    extraReducers : (buider) => {
        buider
        .addCase(loginAsync.pending,(state,action) => {
            state.loader = true
        })
        .addCase(loginAsync.fulfilled,(state,action) => {
            state.loader = false
            state.email = action.payload.email
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.role  = action.payload.role
            state.isAuthenticated = true
            state.error = null
            state.phone_number = action.payload.phone_number

        })
        .addCase(loginAsync.rejected,(state,action) =>{

            state.loader = false
            state.isAuthenticated = false
            state.error = action.payload || 'Something went wrong '
            state.role = null
            state.phone_number = null
            state.first_name = null
            state.last_name = null
            state.email = null
        
        })
    }
})


export const {logout} = loginSlice.actions
export default loginSlice.reducer