import React, { useEffect, useState } from 'react'
import { getCategoryList } from '../../../apis/category'
function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList().then((response) => {
      console.log("category")
      console.log(response)
      setCategoryList(response.data.data);
    }).catch((error) => {
      console.log(error);
    });
  })
  return (
    categoryList.length > 0 
    ? <>
        <div className='category_list_container'>
            <ul className='category_list'>
             {categoryList.map((item) => {
              return <li className='category_list_item'><a href={`/product_list?c=${item.name}`}>{item.name}</a></li>
             })}                 
            </ul>
        </div>
      </>
    : ""
   
  )
}

export default CategoryList