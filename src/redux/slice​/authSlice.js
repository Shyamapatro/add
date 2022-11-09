import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    user: {},
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, actions) => {
            const { user } = actions.payload
            state.user = user
            state.isAuthenticated = user === null ? false : true
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAuth } = AuthSlice.actions

export default AuthSlice.reducer