import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import ProductSingle from '../../components/ProductDetail/ProductSingle/ProductSingle'
import './ProductDetail.css'
import { useSearchParams } from 'react-router-dom';
import { getProductById } from '../../apis/product';
function ProductDetail() {
  const [product, setProduct] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("productId"));
  const productId = searchParams.get("productId");
  const discount = searchParams.get("discount");
  useEffect(() => {
    console.log("get api")
    getProductById(productId)
    .then(function (response) {
      console.log("res" + response)
      if(response.status == '200')
      {
        setProduct(response.data.data);
      }
    })
    .catch(function (error) {
      console.log(error)
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
                  {`${product.categoryId.name} > ${product.name}`}
                </div>
                <ProductSingle 
                  discount={discount !== undefined ? discount : 0}
                  name={product?.name !== undefined ? product?.name : ''}
                  rating={product?.rating !== undefined ? product?.rating : {rate:0,count:0}}
                  price={product?.price !== undefined ? product?.price : 0}
                  description={product?.description !== undefined ? product?.description : ""}
                  id={product?._id !== undefined ? product?._id : ""}
                  key={product?._id !== undefined ? product?._id : ""}
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