import React from 'react'
import { Button } from 'react-bootstrap'
import './ViewAllProductBtn.css'
function ViewAllProductBtn() {
  return (
    <div className='view_all_product_btn_container'>
        <Button className='view_all_product_btn' variant="contained" href="/product_list">
             View all products
        </Button>
    </div>
  )
}

export default ViewAllProductBtn