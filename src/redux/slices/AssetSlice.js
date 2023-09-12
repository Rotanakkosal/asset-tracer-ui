import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assets: [],
  asset: {},
  updateAsset: {},
  invoice: [],
  countCurrentRow: "",
  pageCount: 1,
  totalRow: 0,
};

export const AssetSlice = createSlice({
  name: "Asset",
  initialState,
  reducers: {
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    setAsset: (state, action) => {
      state.asset = action.payload
    },
    setAllInvoice: (state, action) => {
      state.invoice = action.payload
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
    setUpdateAsset: (state, action) => {
      state.updateAsset = action.payload
    }
  },
});

export const { setAssets, setAsset, setAllInvoice, setCountCurrentRow, setPageCount, setTotalRow, setUpdateAsset } = AssetSlice.actions;
export default AssetSlice.reducer;
