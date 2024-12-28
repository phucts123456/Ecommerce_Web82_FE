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
  const hasNoToken = localStorage.getItem('accessToken') === null;
  console.log("Now and accessToken exp")
  console.log(Date.now())
  console.log(hasNoToken)
  const expTime = hasNoToken 
    ? Date.now() 
    : jwtDecode(hasNoToken ? "" : localStorage.getItem('accessToken')).exp * 1000;
  const  authenticate = (hasNoToken === false)
    && (expTime > Date.now());
  useEffect(() => {
    console.log("authenticate")
    console.log(authenticate)
    if(authenticate) {
      const decoded = jwtDecode(localStorage.getItem('accessToken'));
      getUserDetail(decoded.id).then((response) => {
        setUser(response.data.data);
      }).catch((error) => {
        console.log(error)
      })
    } else {
      console.log("remove token");
      localStorage.removeItem('accessToken');
    }
  }, [])
  return (
    <UserContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
      <Outlet />
    </UserContext.Provider>
  )
}

export default UserStore