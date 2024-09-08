import React from 'react'
import './SectionTitle.css'
function SectionTitle({title}) {
  return (
    <div className='today_sales_header_container'>
        <div className='today_sales_header_triangle_container'></div>
        <div className="today_sales_header_title">{title}</div>
    </div>
  )
}

export default SectionTitle
