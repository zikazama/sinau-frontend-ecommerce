import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        password: '',
        message: '',
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload.email;
        },
        setPassword: (state, action) => {
            state.password = action.payload.password;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    }
})

const slice = { authSlice, setEmail: authSlice.actions.setEmail, setPassword: authSlice.actions.setPassword, setMessage: authSlice.actions.setMessage }
export default slice;
