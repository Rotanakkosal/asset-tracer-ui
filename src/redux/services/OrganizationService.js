import apiV2 from "./apiV2"

const getAllOrganizations = async (userId, search = "", sort = "") => {
    return await apiV2.get(`/organizations/${userId}/organization?search=${search}&sort=${sort}`);
}

const joinOrganization = async (data) => {
    return await apiV2.post(`/organizations/join`, data)
}

const saveOrganization = async (data) => {
    return await apiV2.post(`/organizations`, data)
}

const updateOrganization = async (data, orgId) => {
    return await apiV2.put(`/organizations/${orgId}`, data)
}

const deleteOrganization = async (orgId) => {
    return await apiV2.delete(`/organizations/${orgId}`)
}
const getOrganizationInvited = async (page = 1, size = 8, search = "", sort = "") => {
    return await apiV2.get(`/organizations/get-all-invitation-from-organization?page=${page}&size=${size}&search=${search}&sort=${sort}`)
}

const acceptionInvite = async (orgId) => {
    return await apiV2.put(`/organizations/approve-invitation/${orgId}`)
}

const rejectInvitation = async (orgId) => {
    return await apiV2.put(`/organizations/reject-invitation/${orgId}`)
}

const OrganizationService = {
    getAllOrganizations,
    joinOrganization,
    saveOrganization,
    updateOrganization,
    deleteOrganization,
    getOrganizationInvited,
    acceptionInvite,
    rejectInvitation
}

export default OrganizationService;