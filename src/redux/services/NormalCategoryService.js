import apiV2 from "./apiV2";

const getAllNormalCategory = async (orgId = "", page = "", size = "", name = "", sort = "") => {
  return await apiV2.get(`/normal-categories/get-all/${orgId}?page=${page}&size=${size}&name=${name}&sort=${sort}`)
};

const addNormalCategory = async (data) => {
  return await apiV2.post(`/normal-categories`, data);
};

const updateNormalCategory = async (id, data) => {
  return await apiV2.put(`/normal-categories/${id}`, data);
};

const getAllNormalCategoryName = async (orgId) => {
  return await apiV2.get(`/normal-categories/name/${orgId}`)
}

export const deleteNormalCategory = async (id, orgId) => {
  return await apiV2.delete(`/normal-categories/${id}/${orgId}`);
}

const NormalCategoryService = {
  getAllNormalCategory,
  addNormalCategory,
  updateNormalCategory,
  getAllNormalCategoryName,
  deleteNormalCategory,
};
export default NormalCategoryService;
