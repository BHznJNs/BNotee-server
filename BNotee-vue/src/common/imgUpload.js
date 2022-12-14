import axios from "axios"

const imgUploadApi = "/img-upload/"

export default function imgUpload(file, fileName) {
    const formData = new FormData()
    formData.append("image", file, fileName)

    return axios.post(
        imgUploadApi, formData,
        {headers: "multipart/form-data"}
    )
}