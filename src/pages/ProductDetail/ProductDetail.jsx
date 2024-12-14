import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import ProductSingle from '../../components/ProductDetail/ProductSingle/ProductSingle'
import './ProductDetail.css'
import { useSearchParams } from 'react-router-dom';
import { getProductById, getProductVariation } from '../../apis/product';
function ProductDetail() {
  const [product, setProduct] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("productId"));
  const productId = searchParams.get("productId");
  const variationId = searchParams.get("variationId");
  const discount = searchParams.get("discount");
  const [productVariation, setProductVariation] = useState('');
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [imageList, setImageList] = useState([]);
  useEffect(async () => {
    await getProductData();
    await getVariationData();
  }, [])

  const getProductData = async () =>{
    let response =  await getProductById(productId);
    if (response.status === 200) {
      setProduct(response.data.data);
    } else {
      console.log(response);
    }
  }
  const getVariationData = async () =>{
    let response =  await getProductVariation(productId);
    const variations = response.data.data;
    if (response.status === 200 
        && variations) {
      setProductVariation(variations);
      const imgList = [];
      let selectedImage = -1;
      variations.map((variation, index) => {
        if(variation._id === variationId) {
          selectedImage = index;
          setSelectedVariation(variation);
        }
        if(variation.image) {imgList.push(variation.image)};
      });
      if (selectedImage >= 1)
      {
        const selectedVarImage = imgList[selectedImage];
        const firstImage = imgList[0];
        imgList[0] = selectedVarImage;
        imgList[selectedImage] = firstImage;
      }
      console.log(imgList);
      setImageList(imgList);
    } else {
      console.log(response);
    }
  }
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
                {
                  console.log(imageList)
                }
                <ProductSingle 
                  discount={discount !== undefined ? discount : 0}
                  name={product?.name !== undefined ? product?.name : ''}
                  rating={product?.rating !== undefined ? product?.rating : {rate:0,count:0}}
                  price={product?.price !== undefined ? product?.price : 0}
                  description={product?.description !== undefined ? product?.description : ""}
                  id={product?._id !== undefined ? product?._id : ""}
                  key={product?._id !== undefined ? product?._id : ""}
                  category={product?.category !== undefined ? product?.category : ""}
                  image={product?.image !== undefined ? product?.image : ""}
                  variations={productVariation ?? []}
                  selectedVariation={selectedVariation}
                  imageList={imageList} />
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