import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    config: null
}

const configSlice = createSlice({
    name: "config",
    initialState: initialState,
    reducers: {
        setConfig(state, action) { },

    }
})
export const { setConfig } = configSlice.actions
export default configSlice.reducer