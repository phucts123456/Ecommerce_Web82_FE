import axiosClient from "../../apis/axiosInstance";
const orderEndpoint = "/payment"
const vnpayEndpoint = "/vnpay"
const createPaymentUrlEndPoint = "/create-payment-url"
const createPaymentUrl = (orderId, amount) => {
    return axiosClient.post(`${orderEndpoint}${vnpayEndpoint}${createPaymentUrlEndPoint}`, {
        orderId: orderId,
        amount: amount,
        bankCode:""
    })
};

export {
    createPaymentUrl
}