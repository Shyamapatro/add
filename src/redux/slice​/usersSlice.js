import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../../http'
import { getUser, searchUserApi } from '../../http/Apis'

import { STATUS } from './dashboardSlice'

const initialState = {
    data: [],
    status: false,
    singleUser: {},
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, actions) => {
            const { data } = actions.payload
            state.data = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        },
        setSingleUser: (state, actions) => {
            const { data } = actions.payload
            state.singleUser = data
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUsers, setStatus, setSingleUser } = UsersSlice.actions

export default UsersSlice.reducer

// Thunks

export function fetchUsers(page = 1, limit = 10) {
    return async function fetchUsersThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getAllUsers(page, limit);
            dispatch(setUsers(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}

// search
export function searchUser(data) {
    return async function searchUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await searchUserApi(data);
            dispatch(setUsers(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}

// get single user
export function getSingleUser(id) {
    return async function getSingleUserThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getUser(id);
            dispatch(setSingleUser(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}