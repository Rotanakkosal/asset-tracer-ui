import apiV2 from "./apiV2";

const getAllItems = async (orgId, page = 1, size = 8, name = "", normalCategoryName = "", sort = "") => {
  return await apiV2.get(`/item-details/by-organization/${orgId}?page=${page}&size=${size}&name=${name}&normalCategoryName=${normalCategoryName}&sort=${sort}`);
};

const getItemById = async (id) => {
  return await apiV2.get(`/item-details/${id}`)
}

const getAllItemByOrg = async (orgId) => {
  return await apiV2.get(`/item-details/get-all/${orgId}`)
}

const getItemDetailById = async (itemId, orgId) => {
  return await apiV2.get(`/item-details/get-by-id/${itemId}/${orgId}`)
}


const ItemDetailService = { getAllItems, getItemById, getAllItemByOrg, getItemDetailById };

export default ItemDetailService;
