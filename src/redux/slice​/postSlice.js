import { createSlice } from '@reduxjs/toolkit'
import { getAllPosts, getPost } from '../../http'
import { searchPostApi } from '../../http/Apis'

import { STATUS } from './dashboardSlice'

const initialState = {
    data: [],
    status: false,
    singlePost: {},

}

export const PostsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, actions) => {
            const { data } = actions.payload
            state.data = data
        },
        setStatus: (state, actions) => {
            state.status = actions.payload
        },
        setSinglePost: (state, actions) => {
            const { data } = actions.payload
            state.singlePost = data
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPosts, setStatus, setSinglePost } = PostsSlice.actions

export default PostsSlice.reducer

// Thunks
export function fetchPosts(page = 1, limit = 10) {
    return async function fetchPostsThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getAllPosts(page, limit);
            dispatch(setPosts(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}

// search
export function searchPost(data) {
    return async function searchPostThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await searchPostApi({ keyword: data });
            dispatch(setPosts(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}

// get single post
export function getSinglePost(id) {
    return async function getSinglePostThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res = await getPost(id);
            dispatch(setSinglePost(res.data))
            dispatch(setStatus(STATUS.SECCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUS.FAILED))
        }
    }
}
