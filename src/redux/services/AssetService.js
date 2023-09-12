import apiV2 from "./apiV2"

const getAllAssets = async (orgId, page = 1, size = 8, assetName = "", status = "", roomName = "", normalCategoryName = "", sort = "") => {
    return await apiV2.get(`/assets/track/${orgId}?page=${page}&size=${size}&assetName=${assetName}&status=${status}&roomName=${roomName}&normalCategoryName=${normalCategoryName}&sort=${sort}`);
}

const deleteAsset = async (itemId, orgId) => {
    return await apiV2.delete(`/item-details/${itemId}/${orgId}`)
}

const saveAsset = async (data) => {
    return await apiV2.post(`/item-details`, data)
}

const updateAsset = async (id, data) => {
    return await apiV2.put(`/item-details/${id}`, data)
}

const setAsset = async (data) => {
    return await apiV2.post(`/assets`, data);
}

const importMultipleAssets = async (data) => {
    return await apiV2.post(`/assets/multiple`, data);
}

const updateImportedAsset = async (id, data) => {
    return await apiV2.put(`/assets/${id}`, data);
}

const AssetService = { getAllAssets, setAsset, deleteAsset, saveAsset, updateAsset, updateImportedAsset, importMultipleAssets }

export default AssetService;