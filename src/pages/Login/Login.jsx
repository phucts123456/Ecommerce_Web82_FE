import React, {useState} from 'react'
import './Login.css'
function Login() {
    const [userName, setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [isSuccess , setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const login = () => {
        const usersFromDB = localStorage.getItem("user");     
        if(usersFromDB != null)
        {
            const userList = JSON.parse(usersFromDB);
            const loginUser = userList.find((user) => user.userName == userName && user.password == password);
            if(loginUser != null)
            {
                localStorage.setItem('loginUser', JSON.stringify(loginUser));
                setIsSuccess(true);
                setError('');
                setTimeout(() => {                 
                    setIsSuccess(false);
                    document.location.href = '/',true;
                }, 2000);
            }
            else
            {
                setError("Wrong username or password");
            }
        }
        else
        {
            setError("Wrong username or password");
        }
    }
    
    return (
        <>        
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
