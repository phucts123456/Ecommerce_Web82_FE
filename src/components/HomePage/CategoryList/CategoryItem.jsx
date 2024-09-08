import React from 'react'
function CategoryItem({category, img}) {
  return (
    <div className='category_item_container'>
      <a href={`/product_list?category=${category}`} className='category_item'>
        <img className='category_item_img' src={img} alt="" />
        <p className='category_name'>{category}</p>
      </a>
    </div>
  )
}

export default CategoryItem
