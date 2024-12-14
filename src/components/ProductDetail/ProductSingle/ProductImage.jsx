import React from 'react'
import { ImagesProvider, ProductImages } from "react-product-image";

function ProductImage({images}) {

  return (
    <ImagesProvider
      thumbUrls={images}
      imageUrls={images}>
      <div className='product_image_cotainer'>
          <ProductImages />
      </div>
    </ImagesProvider>
  )
}

export default ProductImage
