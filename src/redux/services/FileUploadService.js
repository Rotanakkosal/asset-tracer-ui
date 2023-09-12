import api from "./api"
import apiFile from "./apiFile"

const storeFile = async (file, token) => {
    return await api.post(`/files/file`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    })
}

const getFile = async (fileName) => {

}

const getFileV2 = async (fileName, token) => {
    return await apiFile.get(`files/getFile?fileName=${fileName}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getImage = (fileName) => {
    return "https://api.assettracer.net/api/v1/files/getFile?fileName=" + fileName;
}

const FileUploadService = { storeFile, getFile, getFileV2, getImage}
export default FileUploadService