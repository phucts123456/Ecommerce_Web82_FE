import axiosClient from "../apis/axiosInstance";
const orderEndpoint = "/categories"

function getCategoryList(limit)
{
    let product = null; 
    return axiosClient.get(`${orderEndpoint}`, 
    {
        params:{
          limit:limit,
        }
    })
}

export {
    getCategoryList
}