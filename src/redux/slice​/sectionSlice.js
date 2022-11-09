import { createSlice } from '@reduxjs/toolkit'
import { getAllSections, searchSectionApi } from '../../http/Apis'

import { STATUS } from './dashboardSlice'

const initialState = {
    data: [],
    status: false,

}

export const SectionSlice = createSlice({
    name: 'section',
    initialState,
    reducers: {
        setSections: (state, actions) => {
            const { data } = actions.payload
            state.data = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSections, setStatus } = SectionSlice.actions

export default SectionSlice.reducer

// Thunks
export function fetchSections(page = 1, limit = 10) {
    return async function fetchSectionsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getAllSections(page, limit);
            dispatch(setSections(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}

// search
export function searchSection(data) {
    return async function searchSectionsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await searchSectionApi(data);
            dispatch(setSections(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}
