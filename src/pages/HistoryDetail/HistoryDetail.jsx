import React from 'react'
import { useState,useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './HistoryDetail.css'
import { Button } from 'antd'
import { useSearchParams } from 'react-router-dom';
import { getHistoryDetail } from '../../apis/order'

function HistoryDetail() {
    const [ cartData, setCartData] = useState([]);
    const [ subTotal, setSubtotal] = useState(0);
    const [ totalPrice, setTotalPrice] = useState(0);
    const [ discountPrice, setDiscountPrice] = useState(0);
    const [ shippingFee, setshippingFee] = useState(0);
    const [ currCoupon, setCurrCoupon ] = useState(null);
    const [fullName, setFullName] = useState('');
    const [ companyName, setCompanyName] = useState('');
    const [ streetAddress , setStreetAddress] = useState('');
    const [ city, setCity] = useState('');
    const [ apartment, setApartment] = useState('');
    const [ phoneNumber, setPhoneNumber] = useState('');
    const [ email, setEmail] = useState('');
    let [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    useEffect(()=>{
        // const orders = localStorage.getItem("order") != null 
        //     ? JSON.parse(localStorage.getItem("order")) 
        //     : null;
        // let loginUser = localStorage.getItem("loginUser") != null 
        //     ? JSON.parse(localStorage.getItem("loginUser")) 
        //     : null;
        // let userId = '';
        // if(loginUser != null) userId = loginUser.userId;
        // console.log('userId')
        // console.log(userId)
        // if(orders != null && userId != null)
        // {
        //     console.log("orders")
        //     console.log(orders);

        //     let orderDetail = orders.find((order) => (order.orderId == orderId) && (order.user.userId == userId));
        //     if(orderDetail == null) window.location.href = '/not_found';
        //     console.log("orderDetail")
        //     console.log(orderDetail)
        //     if(orderDetail != null)
        //     {
        //         setCartData(orderDetail.cartData);
        //         setDiscountPrice(orderDetail.discountPrice);
        //         setSubtotal(orderDetail.subTotal);
        //         setTotalPrice(orderDetail.totalPrice);
        //         setFirstName(orderDetail.user.fullName);
        //         setApartment(orderDetail.user.apartment);
        //         setCity(orderDetail.user.city);
        //         setCompanyName(orderDetail.user.companyName);
        //         setEmail(orderDetail.user.email);
        //         setPhoneNumber(orderDetail.user.phoneNumber);
        //         setStreetAddress(orderDetail.user.streetAddress);
        //     }
        // }
        // else
        // {
        //     window.location.href = '/not_found';
        // }
        getHistoryDetail(orderId).then((response) =>{
            console.log(response)
            const order = response.data.data.order;
            console.log(order)
            setCartData(response.data.data.orderItems);
            setSubtotal(order?.totalPrice);
            setTotalPrice(order?.totalPrice);
            setApartment(order.apartment);
            setshippingFee(order.shippingFee)
            setCity(order.city);
            setCompanyName(order?.companyName);
            setEmail(order.email);
            setPhoneNumber(order.phoneNumber);
            setStreetAddress(order.streetAddress);
            setFullName(order.userId.fullName);
        }).catch((error) => {
            console.log(error)
        })
    }, [])


  return (
    <div className='check_out_container'>

        <Container>
            <div className='product_detail_category'>
                  {`Home > OrderDetail > ${orderId}`}
            </div>
            <h2 className='check_out_title'>Billing Details</h2>
            <div className='check_out_info'>
                <div className='check_out_user_info'>
                    <div className='check_out_user_info_input check_out_user_info_first_name'>
                        <label htmlFor="firstName">Full name</label>
                        <input value={fullName} id='firstName' disabled={true}/>  
                    </div>        
                    <div className='check_out_user_info_input check_out_user_info_street_address'>                     
                        <label htmlFor="streetAddress">Street Address</label>
                        <input value={streetAddress} id='streetAddress'disabled={true} />
                    </div>  
                    <div className='check_out_user_info_input check_out_user_info_apartment'>
                        <label htmlFor="apartment">Apartment, floor, etc (optional)</label>
                        <input value={apartment} id='apartment' disabled={true} />
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
                                                    <a className='cart_item_link' href={`/product_detail?productId=${item.productId._id}&variationId=${item.variationId._id}`}>
                                                        <img className='cart_item_img' src={item.variationId.image ?? item.productId.image} />
                                                        {item.productId.name} - {item.variationId.name}
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
                            <div className='subtotal_shipping_fee_price'>{shippingFee}</div>
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
