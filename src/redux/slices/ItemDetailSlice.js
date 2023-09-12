import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemDetails: [],
  itemDetail: {}
};

export const ItemDetailSlice = createSlice({
  name: "ItemDetail",
  initialState,
  reducers: {
    setItemDetails: (state, action) => {
      state.itemDetails = action.payload;
    },
    setItemDetail: (state, action) => {
      state.itemDetail = action.payload
    }
  }
});

export const { setItemDetails, setItemDetail } = ItemDetailSlice.actions;
export default ItemDetailSlice.reducer;
