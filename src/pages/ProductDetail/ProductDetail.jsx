import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import ProductSingle from '../../components/ProductDetail/ProductSingle/ProductSingle'
import './ProductDetail.css'
import { useSearchParams } from 'react-router-dom';
import axiosClient from '../../apis/axiosInstance';
function ProductDetail() {
  const [product, setProduct] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("productId"));
  const productId = searchParams.get("productId");
  const discount = searchParams.get("discount");
  useEffect(() => {
    console.log("get api")
    axiosClient.get(`/products/${productId}`)
    .then(function (response) {
      console.log("res" + response)
      if(response.status == '200')
        {
          const productFromApi = JSON.stringify(response.data);
          console.log("productApi:"+productFromApi)
          setProduct(JSON.parse(productFromApi));
        }
        else
        {
          console.log("status not 200: "+ response);
        }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  }, [])
  return (
    <div className='product_detail_container'>
        <Container>
          {
            product 
            ?
              <>             
                <div className='product_detail_category'>
                  {`${product.category} > ${product.title}`}
                </div>
                <ProductSingle 
                  discount={discount !== undefined ? discount : 0}
                  title={product?.title !== undefined ? product?.title : ''}
                  rating={product?.rating !== undefined ? product?.rating : {rate:0,count:0}}
                  price={product?.price !== undefined ? product?.price : 0}
                  description={product?.description !== undefined ? product?.description : ""}
                  id={product?.id !== undefined ? product?.id : ""}
                  key={product?.id !== undefined ? product?.id : ""}
                  category={product?.category !== undefined ? product?.category : ""}
                  image={product?.image !== undefined ? product?.image : ""}/>
              </> 
            :
              <>
                <div class="loading">
                  Loading&#8230;
                </div>
                <div class="content">
                  
                </div>
              </>
          }
        </Container>
    </div>
  )
}

export default ProductDetail