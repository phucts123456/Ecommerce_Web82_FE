import axiosClient from "../apis/axiosInstance";

function getProductList(pageNumber, searchKey, category)
{
    return axiosClient.get('/products', 
    {
        params:{
          pn:pageNumber,
          sk:searchKey,
          category:category
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