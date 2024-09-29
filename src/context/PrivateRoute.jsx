import UserContext from "../context/userContext";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, redirect  } from 'react-router-dom';
import { useContext } from 'react';
const PrivateRoute = (props) => {
  const userContext = useContext(UserContext);
  console.log(userContext)
  const [user, setUser] = useState(null);
  const authenticate = localStorage.getItem('accessToken') ? true : false;
  return (
    <UserContext.Provider value={{userContext}}>
      {authenticate ? <Outlet /> : <Navigate to='/login' />}
    </UserContext.Provider>
  )
}

export default PrivateRoute