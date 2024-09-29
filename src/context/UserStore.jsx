import UserContext from "./userContext";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, redirect  } from 'react-router-dom';
import { getUserDetail } from "../apis/user";
import { jwtDecode } from "jwt-decode";
const UserStore = (props) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const authenticate = localStorage.getItem('accessToken') ? true : false;
  useEffect(() => {
    if(authenticate) {
      const decoded = jwtDecode(localStorage.getItem('accessToken'));
      getUserDetail(decoded.id).then((response) => {
        setUser(response.data.data);
      }).catch((error) => {
        console.log(error)
      })
    }
  }, [])
  return (
    <UserContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
      <Outlet />
    </UserContext.Provider>
  )
}

export default UserStore