import apiV2 from "./apiV2"

const getAllSuperCategoresName = async (orgId) => {
    return await apiV2.get(`/super-categories/name/${orgId}`)
}

const getSuperCategories = async (orgId, page = 1, size = 8, name = "", sort = "") => {
    return await apiV2.get(`/super-categories/by-organization/${orgId}?page=${page}&size=${size}&name=${name}&sort=${sort}`)
}

const saveSuperCategory = async (data) => {
    return await apiV2.post(`/super-categories`, data)
}

const deleteSuperCategory = async (id, orgId) => {
    return await apiV2.delete(`/super-categories/${id}/${orgId}`)
}

const updateSuperCategory = async (id, data) => {
    return await apiV2.put(`/super-categories/${id}`, data);
}

const SuperCategoryService = {
    getAllSuperCategoresName,
    saveSuperCategory,
    deleteSuperCategory,
    updateSuperCategory,
    getSuperCategories
};

export default SuperCategoryService;