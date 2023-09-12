import apiV2 from "./apiV2";

const getTotalUserInOrg = async (orgId) => {
    return await apiV2.get(`/dashboard/${orgId}/count-user-joined`);
}

const getTotalAssetInOrg = async (orgId) => {
    return await apiV2.get(`/dashboard/${orgId}/count-all-asset`)
}

const getTotalRoomInOrg = async (orgId) => {
    return await apiV2.get(`/dashboard/count-all-rooms/${orgId}`)
}

const getTotalInvoiceInOrg = async (orgId) => {
    return await apiV2.get(`/dashboard/${orgId}/get-all-invoice`)
}

// ============ Pie Chart ==============                                        
const getTotalAssetInStock = async (orgId) => {
    return await apiV2.get(`/dashboard/count-asset-by-status/${orgId}?status=in_stock`)
}

const getTotalAssetInUsed = async (orgId) => {
    return await apiV2.get(`/dashboard/count-asset-by-status/${orgId}?status=in_used`)
}

const getTotalAssetDamage = async (orgId) => {
    return await apiV2.get(`/dashboard/count-asset-by-status/${orgId}?status=damage`)
}

const getTotalAssetDonated = async (orgId) => {
    return await apiV2.get(`/dashboard/count-asset-by-status/${orgId}?status=donated`)
}

const getTotalAssetBroken = async (orgId) => {
    return await apiV2.get(`/dashboard/count-asset-by-status/${orgId}?status=broken`)
}

const getTotalAssetLost = async (orgId) => {
    return await apiV2.get(`/dashboard/count-asset-by-status/${orgId}?status=lost`)
}

const getLastThreeInvoice = async (orgId) => {
    return await apiV2.get(`/dashboard/${orgId}/last-three-invoice`)
}

// =================== Bar Chart ================
const getTotalAssetPerCategory = async (orgId) => {
    return await apiV2.get(`/super-categories/count-asset/${orgId}`)
}

const DashboardService = {
    getTotalUserInOrg,
    getTotalAssetInOrg,
    getTotalRoomInOrg,
    getTotalInvoiceInOrg,
    getTotalAssetInStock,
    getTotalAssetInUsed,
    getTotalAssetDamage,
    getTotalAssetDonated,
    getTotalAssetBroken,
    getTotalAssetLost,
    getLastThreeInvoice,
    getTotalAssetPerCategory
}

export default DashboardService;