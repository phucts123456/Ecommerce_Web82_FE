import React from 'react'
import { useState,useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './HistoryDetail.css'
import { Button } from 'antd'
import { useSearchParams } from 'react-router-dom';

function HistoryDetail() {
    const [ cartData, setCartData] = useState([]);
    const [ subTotal, setSubtotal] = useState(0);
    const [ discountPrice, setDiscountPrice] = useState(0);
    const [ totalPrice, setTotalPrice] = useState(0);
    const [ currCoupon, setCurrCoupon ] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [ companyName, setCompanyName] = useState('');
    const [ streetAddress , setStreetAddress] = useState('');
    const [ city, setCity] = useState('');
    const [ apartment, setApartment] = useState('');
    const [ phoneNumber, setPhoneNumber] = useState('');
    const [ email, setEmail] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    useEffect(()=>{
        const orders = localStorage.getItem("order") != null 
            ? JSON.parse(localStorage.getItem("order")) 
            : null;
        let loginUser = localStorage.getItem("loginUser") != null 
            ? JSON.parse(localStorage.getItem("loginUser")) 
            : null;
        let userId = '';
        if(loginUser != null) userId = loginUser.userId;
        console.log('userId')
        console.log(userId)
        if(orders != null && userId != null)
        {
            console.log("orders")
            console.log(orders);

            let orderDetail = orders.find((order) => (order.orderId == orderId) && (order.user.userId == userId));
            if(orderDetail == null) window.location.href = '/not_found';
            console.log("orderDetail")
            console.log(orderDetail)
            if(orderDetail != null)
            {
                setCartData(orderDetail.cartData);
                setDiscountPrice(orderDetail.discountPrice);
                setSubtotal(orderDetail.subTotal);
                setTotalPrice(orderDetail.totalPrice);
                setFirstName(orderDetail.user.fullName);
                setApartment(orderDetail.user.apartment);
                setCity(orderDetail.user.city);
                setCompanyName(orderDetail.user.companyName);
                setEmail(orderDetail.user.email);
                setPhoneNumber(orderDetail.user.phoneNumber);
                setStreetAddress(orderDetail.user.streetAddress);
            }
        }
        else
        {
            window.location.href = '/not_found';
        }
        
    }, [])


  return (
    <div className='check_out_container'>

        <Container>
            <div className='product_detail_category'>
                  {`Home > Cart > Checkout`}
            </div>
            <h2 className='check_out_title'>Billing Details</h2>
            <div className='check_out_info'>
                <div className='check_out_user_info'>
                    <div className='check_out_user_info_input check_out_user_info_first_name'>
                        <label htmlFor="firstName">FirstName</label>
                        <input value={firstName} id='firstName' disabled={true}/>  
                    </div> 
                    <div className='check_out_user_info_input check_out_user_info_company_name'>
                        <label htmlFor="companyName">Company Name</label>
                        <input value={companyName} id='companyName' disabled={true} />
                    </div>         
                    <div className='check_out_user_info_input check_out_user_info_street_address'>                     
                        <label htmlFor="streetAddress">Street Address</label>
                        <input value={streetAddress} id='streetAddress'disabled={true} />
                    </div>  
                    <div className='check_out_user_info_input check_out_user_info_apartment'>
                        <label htmlFor="apartment">Apartment, floor, etc (optional)</label>
                        <input value={apartment} id='apartment' disabled={true} />
                    </div>  
                    <div className='check_out_user_info_input check_out_user_info_city'>
                        <label htmlFor="city">City</label>
                        <input value={city} id='city' disabled={true} />
                    </div>  
                    <div className='check_out_user_info_input check_out_user_info_phone_number'>
                        <label htmlFor="phoneNumber">PhoneNumber</label>
                        <input value={phoneNumber} id='phoneNumber' disabled={true} />
                    </div>  
                    <div className='check_out_user_info_input check_out_user_info_email'>
                        <label htmlFor="email">Email Address</label>
                        <input value={email} id='email' type={'email'} disabled={true} />
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
                    </div>
                </div>
            </div>
        </Container> 
    </div>
  )
}

export default HistoryDetail
