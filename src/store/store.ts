import { configureStore } from "@reduxjs/toolkit";
import savedJobsReducer from '../features/savedJobs/savedJobsSlice'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
    reducer: {
        savedJobs: savedJobsReducer,
        auth: authReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>