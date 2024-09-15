import UserContext from "./userContext";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, redirect  } from 'react-router-dom';

const PrivateRoute = (props) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const authenticate = localStorage.getItem('accessToken') ? true : false;
    console.log(authenticate)
  console.log("{Phuc}")
  return (
    <UserContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
      {authenticate ? <Outlet /> : <Navigate to='/login' />}
    </UserContext.Provider>
  )
}

export default PrivateRoute