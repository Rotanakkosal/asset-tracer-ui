import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    dataByIdd: [],
    superCategoryDetail : {
        name:"",
        icon:"",
    },
    countCurrentRow: "",
    pageCount: 1,
    totalRow: 0,
    nameFromUpdate: ""
}

export const superCategorySlice = createSlice({
    name: "SuperCategory",
    initialState,
    reducers: {
        setAllSuperCategory: (state, action) => {
            state.data = action.payload
        },
        setSuperCategoryDetail: (state,action) =>{
            state.superCategoryDetail = action.payload
        },
        setDeleteSuperCategory: (state, action) => {
            state.deleteSuperCategory = action.payload
        },
        setUpdateSuperCategory: (state, action) => {
            state.setUpdateSuperCategory = action.payload
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
        setNameFromUpdate: (state, action) => {
            state.nameFromUpdate = action.payload
        }
    }
});

export const { 
    setAllSuperCategory, 
    setSuperCategoryDetail, 
    setDeleteSuperCategory,
    setUpdateSuperCategory, 
    setCountCurrentRow, 
    setPageCount,
    setTotalRow,
    setNameFromUpdate
} = superCategorySlice.actions
export default superCategorySlice.reducer