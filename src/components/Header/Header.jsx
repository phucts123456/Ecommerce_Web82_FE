import React from 'react'
import NavBar from './NavBar'
import './Header.css'
import SearchBar from './SearchBar'
import { Container } from 'react-bootstrap'
import UserAction from './UserAction'

function Header() {
  return (
      <div className='header_container'>
        <Container>
          <div className='header_title_container'>
                <h1 className='header_title'><a href='/'>Ecommerce</a></h1>
            </div>
            <NavBar />
            <SearchBar />
            <UserAction/> 
        </Container>
      </div>
  )
}

export default Header