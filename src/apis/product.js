import axiosClient from "../apis/axiosInstance";
import constants from "../data/constants"
function getProductList(pageNumber, searchKey, category, limit)
{
    return axiosClient.get('/products', 
    {
        params:{
          pn:pageNumber,
          sk:searchKey,
          category:category,
          limit: limit
        }
    })
}

function getProductById(id)
{
   return axiosClient.get('/products/'+id) 
}

function getProductByCategory()
{
    axiosClient.get('/products/category/'+category) 
    .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });;
}


export {getProductList, getProductById, }