import React from 'react'

function ProductImage({img}) {
  return (
    <div className='product_image_cotainer'>
        <img className='product_image' src={img} />
    </div>
  )
}

export default ProductImage
