import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rooms: [],
    room: {},
    dataId: [],
    roomDetail: {},
    deleteRoom: {},
    updateroom:{},
    newUpdateData:{},
    countCurrentRow: "",
    pageCount: 1,
    totalRow: 0,
}
export const roomSilce = createSlice({
    name: "Room",
    initialState,
  
    reducers: {
        setAllRoom: (state, action) => {
            state.rooms = action.payload
        },
        setRoomById: (state, action) => {
            state.dataId = action.payload
        },
        setRoomDetail: (state, action) => {
            state.roomDetail = action.payload
        },
        setDeleteRoom: (state, action) => {
            state.deleteRoom = action.payload
        },
        setUpdateRoom: (state, action)=>{
            state.updateroom = action.payload
        },
        setNewUpdateData: (state, action)=>{
            state.newUpdateData = action.payload
        },
        setRooms: (state, action) => {
            state.rooms = action.payload
        },
        setRoom: (state, action) => {
            state.room = action.payload
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
    }
});
export const { 
    setAllRoom, 
    setRoomById, 
    setRoomDetail, 
    setDeleteRoom,
    setUpdateRoom, 
    setRooms, 
    setRoom,
    setCountCurrentRow,
    setPageCount,
    setTotalRow
} = roomSilce.actions
export default roomSilce.reducer