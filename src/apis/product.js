import axiosClient from "../apis/axiosInstance";
import constants from "../data/constants"
const variationEndpoint = "/get-variation"
function getProductList(pageNumber, searchKey, category, limit, shopId)
{
    return axiosClient.get('/products', 
    {
        params:{
          pn:pageNumber,
          sk:searchKey,
          category:category,
          limit: limit,
          sid:shopId,
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

function checkProductStock(pid, quantityAdCart)
{
  return axiosClient.get('/products/checkStock', 
  {
      params:{
        pid:pid,
        quantity:quantityAdCart,
      }
  })
}

function getProductVariation(productId)
{
    return axiosClient.get(`/products${variationEndpoint}/${productId}`);
}

export {getProductList, getProductById, checkProductStock,getProductVariation}