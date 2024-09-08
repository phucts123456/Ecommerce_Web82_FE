import axiosClient from "../apis/axiosInstance";

function getProductList(limit)
{
    let product = null; 
    axiosClient.get('/products', 
    {
        params:{
          limit:limit
        }
    })
    .then(function (response) {
        if(response.status == '200')
            product = JSON.stringify(response.data);
      })
    .catch(function (error) {
        console.log(error);
    })
    .finally(async function () {
     return product;
    });
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


export {getProductList, getProductById, getProductByCategory}