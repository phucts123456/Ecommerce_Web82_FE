import React from 'react'
import { useState,useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './CheckOut.css'
import { Button } from 'antd'
function CheckOut() {
    const [ cartData, setCartData] = useState([]);
    const [ subTotal, setSubtotal] = useState(0);
    const [ discountPrice, setDiscountPrice] = useState(0);
    const [ totalPrice, setTotalPrice] = useState(0);
    const [ currCoupon, setCurrCoupon ] = useState(null);
    const [ fullName, setFullName] = useState('');
    const [ companyName, setCompanyName] = useState('');
    const [ streetAddress , setStreetAddress] = useState('');
    const [ city, setCity] = useState('');
    const [ apartment, setApartment] = useState('');
    const [ phoneNumber, setPhoneNumber] = useState('');
    const [ email, setEmail] = useState('');
    const [ errorFullName, setErrorFullName ] = useState('');
    const [ errorCompanyName, setErrorCompanyName ] = useState('');
    const [ errorStreetAddress , setErrorStreetAddress ] = useState('');
    const [ errorCity, setErrorCity] = useState('');
    const [ errorApartment, setErrorApartment] = useState('');
    const [ errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [ errorEmail, setErrorEmail] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(()=>{
        const cart = localStorage.getItem("cart");
        console.log("cart "+ typeof cart)
        if(cart != null && cart != '')
        {
            let cartInfor = JSON.parse(cart);
            setCartData(cartInfor);
            const coupon = localStorage.getItem("applyCoupon");
            if(coupon != null && coupon != '')
            {   
                console.log("coupon from local storage " + coupon)
                let couponInfo = JSON.parse(coupon);
                console.log("couponInfo " + couponInfo);
                setCurrCoupon(couponInfo);
                calculateSubTotal(cartInfor, couponInfo);
            }
            else
            {
                calculateSubTotal(cartInfor);
            }
        }
    }, [])
    const calculateSubTotal = (cartInfor, coupon) => {
        let subTotalPrice = 0;
        let discountPrice = 0;
        cartInfor?.map((cart) =>{
            subTotalPrice += Number.parseInt(cart.price) * Number.parseInt(cart.quantity);           
        })
        setSubtotal(subTotalPrice);
        if(coupon != null){
            discountPrice = Math.round((Number.parseInt(coupon.discount) / 100) * subTotalPrice);
            setDiscountPrice(discountPrice);
        }
        setTotalPrice(subTotalPrice - discountPrice);    
    }

    const isLength = (input, fieldName ,number) => {
        console.log(input.length +" "+number);
        if(input.length < number)
            return `${fieldName} must larger or equal ${number} character`
        return '';
    }

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

    const validateFormat = () => {
        const validateEmail = isEmail(email);
            setErrorEmail(validateEmail != '' ? validateEmail : '');
        const validatePhoneNumber = isPhoneNumber(phoneNumber);
            setErrorPhoneNumber(validatePhoneNumber != '' ? validatePhoneNumber : '');
        return validateEmail != ''
            || validatePhoneNumber != '';
    }
    const validateUserInfor = () => {
        const validateFullName = isLength(fullName, 'Full name', 5);
            setErrorFullName(validateFullName != '' ? validateFullName : '');
        const validateCity = isLength(city, 'City', 5);
            setErrorCity(validateCity != '' ? validateCity : '');
        const validateCompanyName = isLength(companyName, 'Company name', 5);
            setErrorCompanyName(validateCompanyName != '' ? validateCompanyName : '');
        const validateStreetAddress = isLength(streetAddress, 'Street address', 5);
            setErrorStreetAddress(validateStreetAddress != '' ? validateStreetAddress : '');
        const validatePhoneNumber = isLength(phoneNumber, 'Phone number', 10);
            setErrorPhoneNumber(validatePhoneNumber != '' ? validatePhoneNumber : '');
        const validateEmail = isLength(email, 'Email', 5);
            setErrorEmail(validateEmail != '' ? validateEmail : '');
        const validateApartment = apartment.length > 0 ? isLength(apartment, 'Apartment', 5) : '';
            setErrorApartment(validateApartment != '' ? validateApartment : '');

        return validateFullName != '' 
            || validateCity != '' 
            || validateCompanyName != '' 
            || validateStreetAddress != '' 
            || validatePhoneNumber != '' 
            || validateEmail != '' 
            || validateApartment != '';
    }

    const completeOrder = () => {
        let isError = validateUserInfor();
        console.log(isError);
        if(isError == false){
            isError = validateFormat();
        }
        let orderHistory = localStorage.getItem("order") != null ? localStorage.getItem("order") : [];
        let orderId = 1;
        if(isError != '') return;
        if (orderHistory.length > 0)
        {
            console.log("history khacs nul");
            let orderHistoryObject = JSON.parse(orderHistory);
            orderId = orderHistoryObject.length + 1;
            let loginUser = localStorage.getItem("loginUser") != null 
                ? JSON.parse(localStorage.getItem("loginUser")) 
                : null;
            let userId = '';
            if(loginUser != null) userId = loginUser.userId; 
            let order = {
                orderId:orderId,
                cartData:cartData,
                subTotal:subTotal,
                discountPrice:discountPrice,
                totalPrice:totalPrice,
                orderDate: (new Date()).toDateString(),
                user: {
                    fullName:fullName,
                    streetAddress:streetAddress,
                    companyName:companyName,
                    city:city,
                    email:email,
                    phoneNumber:phoneNumber,
                    apartment:apartment,
                    userId:userId
                }
            }
            orderHistoryObject.push(order);
            console.log("orderHistoryObject "+ JSON.stringify(orderHistoryObject))
            localStorage.setItem("order", JSON.stringify(orderHistoryObject));
            localStorage.removeItem("cart");
        }
        else
        {
            let loginUser = localStorage.getItem("loginUser") != null 
                ? JSON.parse(localStorage.getItem("loginUser")) 
                : null;
            let userId = '';
            if(loginUser != null) userId = loginUser.userId; 
            console.log("history null");
            let order = [{
                orderId:orderId,
                cartData:cartData,
                subTotal:subTotal,
                discountPrice:discountPrice,
                totalPrice:totalPrice,
                orderDate: (new Date()).toDateString(),
                user: {
                    fullName:fullName,
                    streetAddress:streetAddress,
                    companyName:companyName,
                    city:city,
                    email:email,
                    phoneNumber:phoneNumber,
                    apartment:apartment,
                    userId:userId
                }
            }]
            localStorage.setItem("order", JSON.stringify(order));
            localStorage.removeItem("cart");
        }
        if(isError == false)
        {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                window.location.href = "/";
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
                        <p>Order Success</p>
                        </div>
                    </div>
                </div>
            : ""
        }


        <div className='check_out_container'>
            <Container>
                <div className='product_detail_category'>
                    {`Home > Cart > Checkout`}
                </div>
                <h2 className='check_out_title'>Billing Details</h2>
                <div className='check_out_info'>
                    <div className='check_out_user_info'>
                        <div className='check_out_user_info_input check_out_user_info_first_name'>
                            <label htmlFor="fullName">Full Name</label>
                            <input onChange={(e) => setFullName(e.target.value)} id='fullName'/>
                            <p style={{color:'red'}}>{errorFullName}</p>  
                        </div> 
                        <div className='check_out_user_info_input check_out_user_info_company_name'>
                            <label htmlFor="companyName">Company Name</label>
                            <input onChange={(e) => setCompanyName(e.target.value)} id='companyName'/>
                            <p style={{color:'red'}}>{errorCompanyName}</p>  
                        </div>         
                        <div className='check_out_user_info_input check_out_user_info_street_address'>                     
                            <label htmlFor="streetAddress">Street Address</label>
                            <input onChange={(e) => setStreetAddress(e.target.value)} id='streetAddress'/>
                            <p style={{color:'red'}}>{errorStreetAddress}</p>  
                        </div>  
                        <div className='check_out_user_info_input check_out_user_info_apartment'>
                            <label htmlFor="apartment">Apartment, floor, etc (optional)</label>
                            <input onChange={(e) => setApartment(e.target.value)} id='apartment'/>
                            <p style={{color:'red'}}>{errorApartment}</p>  
                        </div>  
                        <div className='check_out_user_info_input check_out_user_info_city'>
                            <label htmlFor="city">City</label>
                            <input onChange={(e) => setCity(e.target.value)} id='city'/>
                            <p style={{color:'red'}}>{errorCity}</p>  
                        </div>  
                        <div className='check_out_user_info_input check_out_user_info_phone_number'>
                            <label htmlFor="phoneNumber">PhoneNumber</label>
                            <input onChange={(e) => setPhoneNumber(e.target.value)} id='phoneNumber'/>
                            <p style={{color:'red'}}>{errorPhoneNumber}</p>  
                        </div>  
                        <div className='check_out_user_info_input check_out_user_info_email'>
                            <label htmlFor="email">Email Address</label>
                            <input onChange={(e) => setEmail(e.target.value)} id='email'type={'email'}/>
                            <p style={{color:'red'}}>{errorEmail}</p>  
                        </div>    
                    </div>
                    <div className="check_out_cart_info">
                        <div className='cart_list_container'>
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    (cartData.length >= 0) 
                                        && cartData 
                                        && cartData != '' 
                                        ? cartData.map((item) =>{                             
                                            return (
                                            <>
                                                <tr>
                                                    <th scope="row">
                                                        <a className='cart_item_link' href={`/product_detail?productId=${item.productId}&discount=${item.discount}`}>
                                                            <img className='cart_item_img' src={item.image} />
                                                            {item.title}
                                                        </a>
                                                    </th>
                                                    <td>${Number.parseInt(item.price) * Number.parseInt(item.quantity)}</td>
                                                </tr>
                                            </>)}) 
                                        : ""
                                }                
                                </tbody>
                            </table>
                        </div>
                        <div className='subtotal_container'>
                            <h2 className='subtotal_title'>
                                Cart total
                            </h2>
                            <div className='cart_total subtotal_price'>
                                <div className='subtotal_price_title'>Subtotal:</div>
                                <div className='subtotal_price_price'>${subTotal}</div>
                            </div>
                            <div className='cart_total discount_price'>
                                <div className='discount_price_title'>Discount:</div>
                                <div className='discount_price_price'>${discountPrice}</div>
                            </div>
                            <div className='cart_total subtotal_shipping_fee_container'>
                                <div className='subtotal_shipping_fee_title'>Shipping:</div>
                                <div className='subtotal_shipping_fee_price'>Free</div>
                            </div>
                            <div className='cart_total total_price_container'>
                                <div className='total_price_title'>Total:</div>
                                <div className='total_price_price'>${totalPrice}</div>
                            </div>
                            <div className='check_out_btn_continer'>
                                <Button onClick={() => completeOrder()} className='check_out_btn' >Complete Order</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container> 
        </div>
    </>

  )
}

export default CheckOut
