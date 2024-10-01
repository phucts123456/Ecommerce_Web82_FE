import axiosClient from "../apis/axiosInstance";
const orderEndpoint = "/orders"
const historyEndpoint = "/history"
const createOrder = (newOrder) => {
    return axiosClient.post(`${orderEndpoint}`, {
        status: newOrder.status,
        totalPrice: newOrder.totalPrice,
        streetAddress: newOrder.streetAddress,
        apartment: newOrder.apartment,
        city: newOrder.city,
        phoneNumber: newOrder.phoneNumber,
        email: newOrder.email,
        items: newOrder.items,
        companyName: newOrder.companyName,
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