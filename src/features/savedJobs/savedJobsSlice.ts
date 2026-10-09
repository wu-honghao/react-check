import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    ids: string[]
} = {
    ids: []
}

const savedJobs = createSlice({
    name: "savedJobs",
    initialState: initialState,
    reducers: {
        saveJob(state, action: PayloadAction<string>){
            if(!state.ids.includes(action.payload)){
                state.ids.push(action.payload)
            }
        },

        removeJob(state, action: PayloadAction<string>){
            if(state.ids.includes(action.payload)){
                state.ids = state.ids.filter((id) => id !== action.payload)
            }
        }
    }
})

export const { saveJob, removeJob } = savedJobs.actions
export default savedJobs.reducer
