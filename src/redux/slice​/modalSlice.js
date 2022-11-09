import { createSlice } from '@reduxjs/toolkit'

export const TYPES = Object.freeze({
    DELETE_POST: 'deletePost',
    POST_STATUS: 'postStatus',
})

const initialState = {
    isOpen: false,
    title: 'Why i am here?',
    content: 'what the hell is going on?',
    id: '',
    actionsType: TYPES.DELETE_POST,
    useRun: true,
    data: {},

    // add user satet here
    addUserIsOpen: false,
}

export const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsOpen: (state, actions) => {
            const { isOpen, title, content, id, type, useRun, data } = actions.payload
            state.isOpen = isOpen
            state.title = title
            state.content = content
            state.id = id
            state.type = type
            state.useRun = useRun
            state.data = data
        },
        setAddUserIsOpen: (state, actions) => {
            state.addUserIsOpen = actions.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setIsOpen, setAddUserIsOpen } = ModalSlice.actions

export default ModalSlice.reducer