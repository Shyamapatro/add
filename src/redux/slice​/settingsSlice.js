import { createSlice } from '@reduxjs/toolkit'
import { getSettings } from '../../http/Apis'

import { STATUS } from './dashboardSlice'

const initialState = {
    data: [],
    status: false,

}

export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, actions) => {
            const { data } = actions.payload
            state.data = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSettings, setStatus } = SettingsSlice.actions

export default SettingsSlice.reducer

// Thunks
export function fetchSettings() {
    return async function fetchSettingsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getSettings();
            dispatch(setSettings(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}
