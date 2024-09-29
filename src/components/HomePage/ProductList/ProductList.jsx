import React from 'react'
import { Container } from 'react-bootstrap'
import ProductItem from './ProductItem'
import './ProductList.css'
function ProductList({products}) {
  return (
    <div className='product_list_container'>
      {
        products != "" ?
        products?.map((item) => {
          return <ProductItem 
            title={item.name}
            image={item.image} 
            price={item.price} 
            rating={item.rate} 
            id={item._id} />
        }) : 
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      }
    </div>
  )
}

export default ProductList
