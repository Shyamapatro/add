import { createSlice } from '@reduxjs/toolkit'
import { getCount } from '../../http'

export const STATUS = Object.freeze({
    SECCESS: 'secces',
    FAILED: 'failed',
    LOADING: 'loading',
})

const initialState = {
    data: false,
    status: STATUS.SECCESS,
}

export const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setLoadDashboardData: (state, actions) => {
            const { data } = actions.payload
            state.data = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoadDashboardData, setStatus } = DashboardSlice.actions

export default DashboardSlice.reducer

// Thunks

export function fetchDashboardData() {
    return async function fetchDashboardDataThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getCount();
            dispatch(setLoadDashboardData(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}