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
    axiosClient.get('/products/'+id) 
    .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });;
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


export {getProductList}