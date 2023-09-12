import apiV2 from "./apiV2"

const getAllNotification = async (orgId, page = 1, size = 8, search = "", sort = "") => {
    return await apiV2.get(`/organizations/get-all-notifications-by-organization/${orgId}?page=${page}&size=${size}&search=${search}&sort=${sort}`)
}

const getAllNotificationByUser = async () => {
    return await apiV2.get(`/organizations/get-all-notifications-by-user`)
}

const NotificationService = {
    getAllNotification,
    getAllNotificationByUser
}

export default NotificationService;