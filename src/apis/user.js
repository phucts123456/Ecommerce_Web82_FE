import axiosClient from "./axiosInstance";
const userEndpoint = "/user"
const userRegisterEndpoint= "/register"
const userLoginEndpoint= "/login"

function registUser(user) {
   return axiosClient.post(`${userEndpoint}${userRegisterEndpoint}`, {
      userName: user.userName,
      password: user.password,
      phoneNumber: user.phoneNumber,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      address : user.address
    })
}

function loginUser(user) {
    return axiosClient.post(`${userEndpoint}${userLoginEndpoint}`, {
        userName: user.userName,
        password: user.password,
      })
}

export  {
    registUser,
    loginUser
}