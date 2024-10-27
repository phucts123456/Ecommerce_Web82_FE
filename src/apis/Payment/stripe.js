import axiosClient from "../axiosInstance";
const CONST_STRIPE_ENDPOINT = "/payment/stripe"
const CONST_STRIPE_GET_INTENT_ENDPOINT = "/get-intent"
const getIntent = (orderInfo) => {
    return axiosClient.post(`${CONST_STRIPE_ENDPOINT}${CONST_STRIPE_GET_INTENT_ENDPOINT}`, {
        orderInfo:orderInfo
    })
}

export {
    getIntent
}