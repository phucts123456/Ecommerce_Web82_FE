import axiosClient from "../apis/axiosInstance";
import constants from "../data/constants"
const paymentEndpoint = "/payments"

function getPaymentList(pageNumber, searchKey, category, limit)
{
    return axiosClient.get(paymentEndpoint);
}


export {getPaymentList}