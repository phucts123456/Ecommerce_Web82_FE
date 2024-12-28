import axiosClient from "../apis/axiosInstance";
const orderEndpoint = "/orders"
const historyEndpoint = "/history"
const createOrder = (data) => {
    return axiosClient.post(`${orderEndpoint}`, {
        orders: data
      })
};

const getOrderHistory = () => {
    return axiosClient.get(`${orderEndpoint}${historyEndpoint}`);
};

const getHistoryDetail = (orderId) => {
    return axiosClient.get(`${orderEndpoint}/${orderId}`)
}

export {
    createOrder,
    getOrderHistory,
    getHistoryDetail
}