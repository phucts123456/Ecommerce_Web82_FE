import React from 'react'

function CategoryList() {
  return (
    <div className='category_list_container'>
        <ul className='category_list'>
            <li className='category_list_item'><a href="/product_list?category=men's clothing">Men fashion</a></li>
            <li className='category_list_item'><a href="/product_list?category=women's clothing">Women fashion</a></li>
            <li className='category_list_item'><a href='/product_list?category=electronics'>Electronics</a></li>
            <li className='category_list_item'><a href='/product_list?category=jewelery'>Jewelery</a></li>
        </ul>
    </div>
  )
}

export default CategoryList