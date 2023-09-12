import apiV2 from "./apiV2";

const getAllRooms = async (orgId, page = 1, size = 8, search = "", sort = "") => {
   return await apiV2.get(`/rooms/by-organization/${orgId}?page=${page}&size=${size}&search=${search}&sort=${sort}`)
}
const getRoomById = async (id) => {
   return await api.get(`/rooms/${id}`)
}
const addRoom = async (data) => {
   return await apiV2.post(`/rooms`,data)
}
const deleteRoom = async (id)=>{
   return await apiV2.delete(`/rooms/${id}`)
}
const updateRoom = async (id, data) =>{
   return await apiV2.put(`/rooms/${id}`, data)
}
const getAllRoomByOrgId = async (orgId) => {
   return await apiV2.get(`/rooms/get-all-name/${orgId}`)
}

const RoomService = { getRoomById, addRoom, deleteRoom, updateRoom, getAllRoomByOrgId, getAllRooms};
export default RoomService;