import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function SearchBar() {
  const [title, setTitle] = useState("");
  const checkSubmit = (e) => {
    if(e.keyCode == 10 || e.keyCode == 13)
    {
      window.location.href = `/product_list?page=1&title=${title}`;
    }  
  }
  return (
    <div className='search_bar_container'>
      <div className='search_bar_content'>
        <input className='search_bar_content_search_input' placeholder='What are you looking for' onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => {checkSubmit(e)}}/>
        <FontAwesomeIcon className='search_bar_content_icon' icon="fa-solid fa-magnifying-glass" />  
      </div>  
    </div>
  )
}

export default SearchBar
