import React from 'react'
import { Container } from 'react-bootstrap'
import SectionTitle from '../SectionTitle/SectionTitle'
import './FeaturedProduct.css'
function FeaturedProducts() {
  return (
    <div className='featured_products_containers'>
      <Container>
        <SectionTitle title={"Featured"}/>
          <h1>New Arrival</h1>
          <div className='featured_products'>
            <div className='featured_products_left'>
              <img src='/img/ps5.png' alt='' className='featured_products_left_img'>

              </img>
            </div>
            <div className='featured_products_right'>
              <div className='featured_products_right_up'>
                <img src='/img/attractive_woman.png' alt='' className='featured_products_right_up_img'>

                </img>
              </div>
              <div className='featured_products_right_down'>
                <img src='/img/amazon_echo.png' alt='' className='featured_products_right_down_left_img'>

                </img>
                <img src='/img/perfume.png' alt='' className='featured_products_right_down_right_img'>

                </img>
              </div>
            </div>
          </div>
      </Container> 
    </div>
  )
}

export default FeaturedProducts