import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './slice​/modalSlice'
import authSlice from './slice​/authSlice'
import dashboardSlice from './slice​/dashboardSlice'
import postSlice from './slice​/postSlice'
import usersSlice from './slice​/usersSlice'
import sectionSlice from './slice​/sectionSlice'
import categorySlice from './slice​/categorySlice'
import settingsSlice from './slice​/settingsSlice'

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        auth: authSlice,
        dashboard: dashboardSlice,
        post: postSlice,
        users: usersSlice,
        section: sectionSlice,
        category: categorySlice,
        settings: settingsSlice,
    },
})