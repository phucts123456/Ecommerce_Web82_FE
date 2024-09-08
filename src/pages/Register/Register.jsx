import React, {useState} from 'react'
import './Register.css'
function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password , setPassword] = useState("");
    const [rePassword , setRePassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [isRegistFail, setIsRegistFail] = useState("");
    const [isSuccess , setIsSuccess] = useState(false);
    const [ errorUserName , setErrorUserName] = useState("");
    const [ errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [ errorEmail, setErrorEmail] = useState('');


    const isEmail = (input) => {
        const validPassword = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        if(validPassword.test(input) == false)
            return `Please input correct mail format.`
        return ''
    }
    
    const isPhoneNumber = (input) => {
        const validPhoneNumber = new RegExp('(84|0[3|5|7|8|9])+([0-9]{8})');
        if(validPhoneNumber.test(input) == false)
            return `Please input correct phone number format.`
        return ''
    }

    const isLength = (input, fieldName ,number) => {
        console.log(input.length +" "+number);
        if(input.length < number)
            return `${fieldName} must larger or equal ${number} character`
        return '';
    }

    const validateFormat = () => {
        const validateEmail = isEmail(email);
            setErrorEmail(validateEmail != '' ? validateEmail : '');
        const validatePhoneNumber = isPhoneNumber(phoneNumber);
            setErrorPhoneNumber(validatePhoneNumber != '' ? validatePhoneNumber : '');
        return validateEmail != ''
            || validatePhoneNumber != '';
    }
    
    const validateLogin = () =>{
        const validateUserName = isLength(userName, 'User name', 5);
            setErrorUserName(validateUserName != '' ? validateUserName : '');
        const validatePassword = isLength(password, 'Password', 5);
            setErrorPassword(validatePassword != '' ? validatePassword : '');
        const validatePhoneNumber = isLength(phoneNumber, 'Phone number', 10);
            setErrorPhoneNumber(validatePhoneNumber != '' ? validatePhoneNumber : '');
        const validateEmail = isLength(email, 'Email', 5);
            setErrorEmail(validateEmail != '' ? validateEmail : '');
        return validateUserName != '' 
            || validatePassword != '' 
            || validatePhoneNumber != '' 
            || validateEmail != '' 
    }
    const register = () => {
        let error = validateLogin();
        if(error == '') error = validateFormat();
        else setIsRegistFail(true);
        if(error == '' && password != rePassword) 
        {
            console.log("retype not match")
            setIsRegistFail(true);
            setErrorPassword("Password and retype password are not match");
            return;
        }
        else if(error != '')
        {
            setIsRegistFail(true);
        }
        if(error != '') return;
        const usersFromDB = localStorage.getItem("user");     
        if(usersFromDB != null)
        {
            const userList = JSON.parse(usersFromDB);
            if(userList.find((user) => user.userName == userName) != null)
            {
                alert("user existed");
                return;
            }
            const userId = userList.length + 1;
            const newUser = {
                userId:userId,
                userName:userName,
                email:email,
                phoneNumber:phoneNumber,
                password:password
            } 

            userList.push(newUser);
            localStorage.setItem("user", JSON.stringify(userList));
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                document.location.href = '/login',true;
            },2000);
        }
        else
        {
            const newUser = [{
                userId: 1,
                userName: userName,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            }]
            localStorage.setItem("user", JSON.stringify(newUser));
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                document.location.href = '/login',true;
            },2000);
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
                            <p>Regist success</p>
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
                        <h2 className='login_right_title'>Register</h2>
                        <span>Enter your details below</span>
                        <div className='login_right_input_container'>
                            <input className='login_right_input login_right_input_user_name' placeholder='Enter your username' onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        { errorUserName != '' && isRegistFail ? <p style={{color:'red'}}>{errorUserName}</p> : ""}
                        <div className='login_right_input_container'>
                            <input className='login_right_input login_right_input_email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        { errorEmail != '' && isRegistFail ? <p style={{color:'red'}}>{errorEmail}</p> : ""}
                        <div className='login_right_input_container'>
                            <input className='login_right_input login_right_input_phone_number' placeholder='Enter your phone number' onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        { errorPhoneNumber != '' && isRegistFail ? <p style={{color:'red'}}>{errorPhoneNumber}</p> : ""}
                        <div className='login_right_input_container'>
                            <input type={"password"} className='login_right_input login_right_input_password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />                                    
                        </div>
                        { errorPassword != '' && isRegistFail ? <p style={{color:'red'}}>{errorPassword}</p> : ""}
                        <div className='login_right_input_container'>
                            <input type={"password"} className='login_right_input login_right_input_password' placeholder='Retype your password' onChange={(e) => setRePassword(e.target.value)} />
                        </div>
                        <div className='login_right_input login_right_input_submit'>
                            <button className='login_right_input login_right_submit_btn' onClick={() => register()}>Register</button>
                            <a href='/login'>Already have an account?</a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register
