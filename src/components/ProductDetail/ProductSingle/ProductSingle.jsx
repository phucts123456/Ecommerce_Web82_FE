import React from 'react'
import './ProductDetail.css'
import ProductInfor from './ProductInfor'
import ProductImage from './ProductImage'
function ProductSingle({name,rating,price,description,image,id,category,discount,variations,selectedVariation,imageList,shopId,shopName,shopAddress}) {
  return (
    <div className='product_detail_container'>
        <ProductImage images={imageList} />
        <ProductInfor 
          discount={discount}
          name={name}
          rating={rating}
          price={price}
          description={description}
          id={id}
          key={id}
          category={category}
          image={image}
          variationList={variations}
          selectedVariation={selectedVariation}
          shopId={shopId}
          shopName={shopName}
          shopAddress={shopAddress}
        />
   </div>
  )
}

export default ProductSingle
