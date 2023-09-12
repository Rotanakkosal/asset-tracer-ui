import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  normalCategories: [],
  normalCategory: {
    name: "",
    icon: "",
    superCategoryId: "",
    organizationId: ""
  },
  isCreateSuccess: false,
  isUpdateSuccess: false,
  countCurrentRow: "",
  pageCount: 1,
  totalRow: 0,
  nameFromUpdate: ""
};

export const normalCategorySlice = createSlice({
  name: "NormalCategory",
  initialState,
  reducers: {
    setNormalCategories: (state, action) => {
      state.normalCategories = action.payload;
    },
    setNormalCategory: (state, action) => {
      state.normalCategory = action.payload
    },
    setIsCreateSuccess: (state, action) => {
      state.isCreateSuccess = action.payload
    },
    setIsUpdateSuccess: (state, action) => {
      state.isUpdateSuccess = action.payload
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
  },
});

export const {
  setNormalCategories,
  setNormalCategory,
  setIsCreateSuccess,
  setIsUpdateSuccess,
  setCountCurrentRow,
  setPageCount,
  setTotalRow,
  setNameFromUpdate
} = normalCategorySlice.actions;

export default normalCategorySlice.reducer;
