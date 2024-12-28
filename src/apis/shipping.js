import axiosClient from "./axiosInstance";
const shippingEndpoint = "/shipping"
const provinceEndpoint = "/get-province"
const districtEndpoint = "/get-district"
const wardEndpoint = "/get-ward"
const getFeeEndpoint = "/get-fee"

function getProvinces() {
    return axiosClient.get(`${shippingEndpoint}${provinceEndpoint}`)
}

function getDistricts(provinceId) {
    return axiosClient.get(`${shippingEndpoint}${districtEndpoint}`,{
        params:{
            "provinceId":provinceId
        }
    })
}

function getWards(districtId) {
    return axiosClient.get(`${shippingEndpoint}${wardEndpoint}`, {
        params:{
            "districtId":districtId
        }
    })
}

function getShippingFee(data) {
    return axiosClient.post(`${shippingEndpoint}${getFeeEndpoint}`, data)
}

export {
    getProvinces,
    getDistricts,
    getWards,
    getShippingFee
}