import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isAuthenticated: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        signin(state, action) {
            state.isAuthenticated = true,
                state.user = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        logout(state, action) {
            state.isAuthenticated = false,
                state.user = null
        }
    }
})
export const { signin, setUser, logout } = authSlice.actions
export const selectUser = state => state.auth;
export default authSlice.reducer