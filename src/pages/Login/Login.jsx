import React, {useState} from 'react'
import './Login.css'
import {loginUser} from '../../apis/user'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
    const [userName, setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [isSuccess , setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken") != null);
    useEffect(() => {
        if(isLogin) navigate("/product_list");
        else {
            const msg = localStorage.getItem("msg");
            if(msg != null) {
                setError(msg);
                localStorage.removeItem("msg");
            }
        }
    }, [])
    const login = () => {
            setError("")
            console.log(userName)
            console.log(password)
            const loginUser = {
                userName: userName,
                password: password,
            }
            doLoginProcess(loginUser);
    }

    const doLoginProcess = (user) => {
        console.log("doLogin")
        const userLogin = loginUser(user).then((response) => {
            console.log(response)
            if(response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }
            setIsSuccess(true);
           setTimeout(() => {
               location.href = "/"
           }, 2000)
        }).catch((error) => {
            if(error.response.data.message)
                setError(error.response.data.message)
            console.log(error)
        })
    }
    return (
        isLogin ?
        <div></div>
        :<>  
            {
                isSuccess ?
                    <div id="myModal" class="modal">
                        <div class="modal-content">                   
                            <div class="wrapper" style={{display:'flex',flexDirection:'column'}}> 
                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                            <p>Login success</p>
                            </div>
                        </div>
                    </div>
                : ""
            }
            <div className='login_container'>
                <div className='login_left'>
                    <img className='login_left_img' src='/img/login_regis_img.png' />
                </div>
                <div className='login_right'>
                    <div className='login_right_form'>
                        <h2 className='login_right_title'>Login</h2>
                        <span>Enter your details below</span>
                        <div className='login_right_input_container'>
                            <input className='login_right_input login_right_input_user_name' placeholder='Enter your username' onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className='login_right_input_container'>
                            <input type={"password"} className='login_right_input login_right_input_password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='login_right_input_submit'>
                            <button className='login_right_input login_right_submit_btn' onClick={() => login()}>Login</button>
                            <a href='/register'>Create an account</a>
                        </div>
                        <p style={{color:'red'}}>{error}</p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
