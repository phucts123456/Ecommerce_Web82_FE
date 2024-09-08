import React from 'react'

function ListLink({listLink, title}) {
  return (
    <div className='list_link_container'>
        <h2>{title}</h2>
        <ul className='list_link'>
            {listLink.map((item) =>{
                return (
                    <li >
                        <a href='#' className='list_link_item'>{item}</a>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default ListLink