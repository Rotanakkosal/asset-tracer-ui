import axios from "axios";

const api = axios.create({
    baseURL: "https://api.assettracer.net/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

export default api;