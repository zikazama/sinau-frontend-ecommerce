import { configureStore } from '@reduxjs/toolkit'
import slice from './slice.js'
import authSlice from './authSlice.js'

// configure store multi reducer
const store = configureStore({
    reducer: { counter: slice.counterSlice.reducer, auth: authSlice.authSlice.reducer }
})

export default store;