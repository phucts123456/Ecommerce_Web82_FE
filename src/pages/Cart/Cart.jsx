import { Button, Select } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import couponList from '../../data/coupon'
import './Cart.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce'
function Cart() {
    const [ cartData, setCartData] = useState([]);
    const [ subTotal, setSubtotal] = useState(0);
    const [ discountPrice, setDiscountPrice] = useState(0);
    const [ totalPrice, setTotalPrice] = useState(0);
    const [ selectedCoupon, setSelectedCoupon ] = useState("");
    const [ currCoupon, setCurrCoupon ] = useState(null);
    const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken") != null);
    const [inputValue, setInputValue] = useState(0);
    const navigate = useNavigate();
    const [value] = useDebounce(inputValue, 2000);
    var typingTimer;                //timer identifier
    var doneTypingInterval = 5000;  //time in ms, 5 seconds for example
    useEffect(()=>{
        if(!isLogin) navigate("/login");
        const cart = localStorage.getItem("cart");
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
    const handleChange = (value) => {

        setSelectedCoupon(value);
    }
    const ApplyCoupon = () => {
        let coupon = couponList.find((coupon) => coupon.couponId == selectedCoupon)
        if(coupon != null)
        {   
            localStorage.setItem("applyCoupon", JSON.stringify(coupon));
            console.log("coupon" + JSON.stringify(coupon))
            setCurrCoupon(coupon);
            const cart = localStorage.getItem("cart");
            let cartInfor = JSON.parse(cart);
            setCartData(cartInfor);
            calculateSubTotal(cartInfor, coupon);
        }
    }
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
    const deleteSingle = (productId, price) => {
        const cart = localStorage.getItem("cart");
        if(cart != null 
            && cart.length > 0 
            && cart != '')
        {
            let cartList = JSON.parse(cart);
            let cartToUpdate = cartList.filter(function(item) {
                if (item['productId'] == productId && item['price'] == price) 
                    return false;
                return true;
            });
            setCartData(cartToUpdate);
            const coupon = localStorage.getItem("applyCoupon");
            if(coupon != null && coupon != '')
            {   
                console.log("coupon from local storage " + coupon)
                let couponInfo = JSON.parse(coupon);
                calculateSubTotal(cartToUpdate, couponInfo);
            }
            else
            {
                calculateSubTotal(cartToUpdate);
            }
            if(cartToUpdate.length == 0)
            {
                localStorage.removeItem("applyCoupon");
            }
            localStorage.setItem("cart", JSON.stringify(cartToUpdate));
        }
    }

    const handleCheck = () => {
        // Clears running timer and starts a new one each time the user types
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.updateCartQuantity();
        }, 1000);
      }

    function updateCartQuantity(inputQuantity, item) {
        console.log(inputQuantity);
        const cart = localStorage.getItem("cart");
        console.log("cart not null");
        let cartProductList = JSON.parse(cart);
        console.log("cartProductList ");
        console.log(cartProductList);
        let cartToUpdate = cartProductList.find((cartProduct) => cartProduct.productId == item.productId && cartProduct.price == Math.round(item.price));
        console.log("cartToUpdate ");
        console.log(cartToUpdate);
        if(cartToUpdate != null)
        {
            console.log("cart khac null");
            var tempCartProductList = cartProductList.filter((product) => product.productId != item.productId);
            console.log("tempCartProductList " + tempCartProductList);
            cartToUpdate.quantity = Number.parseInt(inputQuantity);
            cartToUpdate.price = Math.round(item.price,3);
            tempCartProductList = [...tempCartProductList, cartToUpdate];
            localStorage.setItem("cart" , JSON.stringify(tempCartProductList));
        }
        else
        {
            var cartProduct = {
                productId: id,
                title: name,
                price: calculatePrice(),
                quantity: inputQuantity,   
                discount: discount,
                image: image
            }
            cartProductList = [...cartProductList, cartProduct];
            localStorage.setItem("cart" , JSON.stringify(cartProductList));      
        }
        window.location.href = "/cart";
    }

    return (
        <div className='cart_container'>
            <Container>
                <div className='product_detail_category'>
                    {'Home > Cart'}
                </div>
                <div className='cart_list_container'>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col"></th>
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
                                            <td>{item.price}</td>
                                            <td>
                                                <input 
                                                    onBlur={(e) =>{updateCartQuantity(e.target.value,item);}} 

                                                    style={{width:'60px',height:"40px",borderRadius:'5px',textAlign:"center",border:"1px solid var(--black-color)",}} 
                                                    type={'number'} 
                                                    defaultValue={item.quantity} />
                                            </td>
                                            <td>{Number.parseInt(item.price) * Number.parseInt(item.quantity)}</td>
                                            <td><button style={{backgroundColor:"var(--white-color)"}} onClick={() => {deleteSingle(item.productId,item.price)}}><img style={{width:'30px'}} src='/img/icons8-trash.svg'/></button></td>
                                        </tr>
                                    </>)}) 
                                : ""
                        }                
                        </tbody>
                    </table>
                </div>
                {
                    (cartData.length >= 0) 
                    && cartData 
                    && cartData != '' 
                    ?   
                        <div className='coupon_and_subtotal_container'>
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
                                    <Button href='/check_out' className='check_out_btn' >Process checkout</Button>
                                </div>
                            </div>
                        </div> 
                    : ""
                }
            
            </Container>
        </div>
  )
}

export default Cart