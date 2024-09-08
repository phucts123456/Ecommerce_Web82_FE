import React from 'react'
import { Container } from 'react-bootstrap'
import './AdvImage.css'
function AdvImage({img}) {
  return (
    <div className='AdvImage_container'>
        <Container>
            <a href='#'>
                <img className='AdvImage_container_img' src={img} />
            </a>
        </Container>
    </div>
  )
}

export default AdvImage
