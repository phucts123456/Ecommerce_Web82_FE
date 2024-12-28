import UserContext from "../context/userContext";
import { useState } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import webMessges from "../data/webMessage";
const PrivateRoute = (props) => {
  const userContext = useContext(UserContext);
  console.log(userContext)
  const [user, setUser] = useState(null);
  let authenticate = false;
  authenticate = localStorage.getItem('accessToken') ? true : false;
  const DoOutOfSessionProcess = () => {
    localStorage.setItem("msg", webMessges.MESSAGE_OUT_OF_SESSION_USER);
  }
  if (!authenticate) {
    DoOutOfSessionProcess();
  }
  return (
    <UserContext.Provider value={{userContext}}>
      {authenticate ? <Outlet /> : <Navigate to='/login' replace={true}/>}
    </UserContext.Provider>
  )
}

export default PrivateRoute