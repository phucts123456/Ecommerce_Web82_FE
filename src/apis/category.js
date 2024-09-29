import axiosClient from "../apis/axiosInstance";
const orderEndpoint = "/categories"

function getCategoryList(pageSize, limit)
{
    return axiosClient.get(`${orderEndpoint}`, 
    {
        params:{
            pn: pageSize,
            limit:limit,
        }
    })
}

export {
    getCategoryList
}