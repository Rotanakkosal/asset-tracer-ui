import { Search } from "@mui/icons-material";
import api from "./api"
import apiV2 from "./apiV2";

const signin = async (data) => {
    return await api.post(`/users/login`, data)
}

const singup = async (data) => {
    return await api.post(`/users/register`, data)
}

const changeUserPassword = async (userId, data) => {
    return await api.put(`/users/change-password/${userId}`, data)
}

const updateProfile = async (userId, data) => {
    return await api.put(`/users/${userId}/user`, data)
}

const forgotPassword = async (email) => {
    return await api.get(`/users/forgot-password?userEmail=${email}`)
}

const checkValidCode = async (id, code) => {
    return await api.get(`/users/reset-password?id=${id}&code=${code}`)
}

const setNewPassword = async (id, code, data) => {
    return await api.post(`/users/set-password/${id}/${code}`, data)
}

const verifyRegistration = async (code) => {
    return await api.get(`/users/register/verify?code=${code}`)
}

const getProfileUser = async (userId) => {
    return await api.get(`users/${userId}`)
}

const getUserAllInOrganizations = async (orgId,search = "",sort = "") => {
    return await apiV2.get(`/organizations/get-all-joined-users/${orgId}?search=${search}&sort=${sort}`);
}

const getAllRequestUsers = async (search = "", sort = "") => {
    return await apiV2.get(`/organizations/get-all-request-users?search=${search}&sort=${sort}`)
}

const approveUserRequests = async (orgId, userId) => {
    return await apiV2.put(`/organizations/approve-user?userId=${userId}&organizationId=${orgId}`)
}

const rejectUserRequest = async ( userId, orgId) => {
    return await apiV2.put(`/organizations/reject-user?userId=${userId}&organizationId=${orgId}`)
}

const searchUser = async (search) => {
    return await apiV2.get(`/users/search-users?search=${search}`)
}

const inviteUser = async (data) => {
    return await apiV2.put(`/users/invite-user`, data)
}

const getAllOrganizationByOwner = async () => {
    return await apiV2.get(`/organizations/get-all-organizations-by-owner`)
}

const removeUserFromOrg = async (userId, orgId) => {
    return await apiV2.put(`/organizations/remove-member/${userId}/${orgId}`)
}
const UserService = {
    signin,
    singup,
    changeUserPassword,
    updateProfile,
    forgotPassword,
    checkValidCode,
    setNewPassword,
    verifyRegistration,
    getProfileUser,
    getUserAllInOrganizations,
    getAllRequestUsers,
    approveUserRequests,
    rejectUserRequest,
    searchUser,
    inviteUser,
    getAllOrganizationByOwner,
    removeUserFromOrg
}

export default UserService;