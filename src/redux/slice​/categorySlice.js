import { createSlice } from '@reduxjs/toolkit'
import { getAllCategories, searchCategoryApi } from '../../http/Apis'

import { STATUS } from './dashboardSlice'

const initialState = {
    data: [],
    status: false,

}

export const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, actions) => {
            const { data } = actions.payload
            state.data = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCategory, setStatus } = CategorySlice.actions

export default CategorySlice.reducer

// Thunks
export function fetchCategories(page = 1, limit = 10, order = 1) {
    return async function fetchCategoryThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getAllCategories(page, limit, order);
            dispatch(setCategory(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}

// search
export function searchCategory(data) {
    return async function searchCategoryThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await searchCategoryApi(data);
            dispatch(setCategory(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}
