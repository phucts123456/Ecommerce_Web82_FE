import axiosClient from "../apis/axiosInstance";
const orderEndpoint = "/orders"

const createOrder = (newOrder) => {
    return axiosClient.post(`${orderEndpoint}`, {
        status: newOrder.status,
        totalPrice: newOrder.totalPrice,
        streetAddress: newOrder.streetAddress,
        apartment: newOrder.apartment,
        city: newOrder.city,
        phoneNumber: newOrder.phoneNumber,
        email: newOrder.email,
        items: newOrder.items
      })
};

export {
    createOrder
}