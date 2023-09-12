import axios from "axios";

const apiFile = axios.create({
    baseURL: "https://api.assettracer.net/api/v1",
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    responseType: 'blob',

})

export default apiFile;