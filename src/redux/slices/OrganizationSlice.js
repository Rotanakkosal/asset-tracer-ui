import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  item: null,
  orgDetail: {
    id: "",
    name: "",
    code: "",
    address: "",
    roleName: "",
    image: "",
  },
  orgInvited: [],
  acceptInvite: [],
  countCurrentRow: "",
  pageCount: 1,
  totalRow: 0,
};

export const organizationSlice = createSlice({
  name: "Organization",
  initialState,
  reducers: {
    setAllOrganization: (state, action) => {
      state.data = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },
    setOrgDetail: (state, action) => {
      state.orgDetail = action.payload;
    },
    setOrganizationInvited: (state, action) => {
      state.orgInvited = action.payload;
    },
    setAcceptInvite: (state, action) => {
      state.acceptInvite = action.payload;
    },
    setCountCurrentRow: (state, action) => {
      state.countCurrentRow = action.payload
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload
    },
    setTotalRow: (state, action) => {
      state.totalRow = action.payload
    }
  },
});

export const {
  setAllOrganization,
  setItem,
  setOrgDetail,
  setOrganizationInvited,
  setAcceptInvite,
  setCountCurrentRow,
  setPageCount,
  setTotalRow
} = organizationSlice.actions;
export default organizationSlice.reducer;
