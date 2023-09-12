import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: [],
    notificationByUser: [],
    countCurrentRow: "",
    pageCount: 1,
    totalRow: 0,
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setAllNotification: (state, action) => {
            state.notifications = action.payload;
        },
        setCountCurrentRow: (state, action) => {
            state.countCurrentRow = action.payload
        },
        setPageCount: (state, action) => {
            state.pageCount = action.payload
        },
        setTotalRow: (state, action) => {
            state.totalRow = action.payload
        },
        setNotificationByUser: (state, action) => {
            state.notificationByUser = action.payload
        }
    }
})
export const { setAllNotification, setCountCurrentRow, setPageCount, setTotalRow, setNotificationByUser } = notificationSlice.actions
export default notificationSlice.reducer