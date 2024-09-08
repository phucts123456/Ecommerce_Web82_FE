import React from 'react'
import { Container } from 'react-bootstrap'
import ListLink from './ListLink'
import './Footer.css'
function Footer() {
  return (
    <div className='footer_container'>
      <Container>
        <div className='footer_list_link'>
            <ListLink listLink={['Subcribe','Get 10% off your first order']} title="Ecommerce" />
        </div>
        <div className='footer_list_link'>
            <ListLink listLink={['111 Bijoy sarani, Dhaka,HD 1515, Bandladesh','eccomerce@gmail.com','+8801-23444-3334']} title="Support" />
        </div>
        <div className='footer_list_link'>
            <ListLink listLink={['My account','Login / Register','Cart','Wishlist','Shop']} title="Account" />
        </div>
        <div className='footer_list_link'>
            <ListLink listLink={['Privacy','Terms Of Use','FAQ',"Contact"]} title="Quick Link" />
        </div>
      </Container>
    </div>
  )
}

export default Footer
