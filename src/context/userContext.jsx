import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser, accessToken, setAccessToken}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState