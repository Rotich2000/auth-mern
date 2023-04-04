import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/auth/userSlice'
import usernameReducer from '../features/auth/usernameSlice'

export const store = configureStore({
  reducer: {
    auth: userReducer,
    username: usernameReducer 
  },
})