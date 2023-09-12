import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "./OrganizationSlice";

const initialState = {
  profile: [],
  profileDetail: {
    name: "",
    gender: "",
    phone: "",
    address: "",
    image: "",
  },
  profileImage: null,
  data: [],
  users: null,
  userDetail: {
    name: "",
  },
  requestUsers: [],
  approveUsers: [],
  rejectUseReq: [],
  searchUsers:[],
  invite:[],
  organizationByOwner: [],
  searchUsers: [],
  org: {
    id: "",
    name: "",
    logo: ""
  },
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setAllUser: (state, action) => {
      state.data = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfileDetail: (state, action) => {
      state.profileDetail = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setRequestUsers: (state, action) => {
      state.requestUsers = action.payload;
    },
    setUserapprove: (state, action) => {
      state.approveUsers = action.payload;
    },
    setUserReject: (state, action) => {
      state.rejectUseReq = action.payload;
    },
    setInviteUser: (state, action) => {
      state.searchUsers = action.payload
    },
    setInvite: (state, action) => {
      state.invite = action.payload
    },
    setOrganizationByOwner: (state, action) => {
      state.organizationByOwner = action.payload
    },
    setSearchUsers: (state, action) => {
      state.searchUsers = action.payload
    },
    setOrgId: (state, action) => {
      state.org = action.payload
    },
  },
});

export const {
  setProfile,
  setProfileDetail,
  setProfileImage,
  setAllUser,
  setUsers,
  setUserDetail,
  setRequestUsers,
  setUserapprove,
  setUserReject,
  setOrganizationInvited,
  setInviteUser,
  setInvite,
  setOrganizationByOwner,
  setSearchUsers,
  setOrgId,
  setRemoveUser
} = userSlice.actions;
export default userSlice.reducer;
