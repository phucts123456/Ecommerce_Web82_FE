import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/userContext';
function UserAction() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken") !== null);
  const [loginUser, setLoginUser] = useState({});
  const userContext = useContext(UserContext);
  console.log(userContext)
  const logout = () => {
    if(isLogin) 
      localStorage.removeItem("accessToken");
    window.location.href = '/'
  }
  return (
    <div className='user_action_container'>
      <Button style={{backgroundColor:'white',border:'none'}}>
        <a className='icon_link' href='/cart'><FontAwesomeIcon className='user_action_item user_action_cart' icon="fa-solid fa-cart-shopping" /></a>
      </Button>
      <div class="dropdown">
        <button style={{backgroundColor:'white',border:'none'}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <a className='icon_link' href='/login'><FontAwesomeIcon className='user_action_item user_action_user' icon="fa-regular fa-circle-user" /></a>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {
            isLogin 
            ? <>
                <li><a class="dropdown-item" href="#">Hello, {userContext.user?.fullName} </a></li>
                <li><a class="dropdown-item" href="/order_history_list">Order History</a></li>
                <li><a class="dropdown-item" style={{cursor:'pointer'}} onClick={() =>logout()}>Logout</a></li>
              </>
            : <li><a class="dropdown-item" href="/login">Login </a></li>
          }

        </ul>
      </div>
      
    </div>
  )
}

export default UserAction
