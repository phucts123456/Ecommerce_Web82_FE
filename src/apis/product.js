import axiosClient from "../apis/axiosInstance";

function getProductList(pageNumber, searchKey)
{
    let product = null; 
    return axiosClient.get('/products', 
    {
        params:{
          pn:pageNumber,
          sk:searchKey
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