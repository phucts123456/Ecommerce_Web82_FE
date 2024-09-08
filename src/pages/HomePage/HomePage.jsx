import React from 'react'
import AdvImage from '../../components/HomePage/AdvImage/AdvImage'
import CategoryAndSlider from '../../components/HomePage/CategoryAndSlider/CategoryAndSlider'
import CategoryList from '../../components/HomePage/CategoryList/CategoryList'
import FeaturedProducts from '../../components/HomePage/FeaturedProducts/FeaturedProducts'
import TodaySales from '../../components/HomePage/TodaySales/TodaySales'
import './HomePage.css'
function HomePage() {
  return (
    <div className='home_page_container'>
      <CategoryAndSlider />
      <TodaySales />
      <CategoryList />
      <AdvImage img={'/img/AdvImg.png'}/>
      <FeaturedProducts />
      <AdvImage img={'/img/Services.png'}/>
    </div>
  )
}

export default HomePage