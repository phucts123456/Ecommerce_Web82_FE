import SlideShow  from './SlideShow'
import React from 'react'
import { Container } from 'react-bootstrap'
import CategoryList from './CategoryList'
import './CategoryAndSlider.css'
function CategoryAndSlider() {
  return (
    <div className='category_and_slider_container'>
      <Container>
        <CategoryList/>
        <SlideShow />
      </Container>
    </div>
  )
}

export default CategoryAndSlider
