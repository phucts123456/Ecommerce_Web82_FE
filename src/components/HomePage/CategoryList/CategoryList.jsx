import React from 'react'
import { Container } from 'react-bootstrap'
import CategoryItem from './CategoryItem'
import './CategoryList.css'
import SectionTitle from '../SectionTitle/SectionTitle'
import { useState } from 'react'
function CategoryList() {
  const [categories, setCategories] = useState(['electronics','jewelery','men\'s clothing','women\'s clothing'])
  const [categoryImgs, setCategoryImgs] = useState([
    '/img/category_electronic_devices.png',
    '/img/jewelry.png',
    '/img/men_clothes.png',
    '/img/woman_clothes.png'])
  return (
    <div className='category_horizontal_list_container'>
      <Container>
        <SectionTitle title={"Categories"}/>
        <h1 className='category_list_container_title'>
          Browse By Category
        </h1>
        <div className='category_list'>
          {
            categories.map((category,index) => {
              return <CategoryItem category={category} img={categoryImgs[index]}/>
            })
          }
        </div>
      </Container>

    </div>
  )
}

export default CategoryList
