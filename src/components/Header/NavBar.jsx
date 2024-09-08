import React from 'react'

function NavBar() {
  return (
    <div className='nav_bar_container'>
      <div className='nav_bar_link_list'>
        <a href='/' className='nav_bar_link_list_item'>Home</a>
        <a href='/product_list' className='nav_bar_link_list_item'>Products</a>
      </div>
    </div>
  )
}

export default NavBar
