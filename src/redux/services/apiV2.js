import axios from "axios";
const apiV2 = axios.create({
    baseURL: "https://api.assettracer.net/api/v1",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

apiV2.interceptors.request.use((s)=> {
    const token = localStorage.getItem("token")
    s.headers.Authorization= "Bearer "+ token
    return s
})

export default apiV2;