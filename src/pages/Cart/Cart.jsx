import { Button, Select } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import couponList from '../../data/coupon'
import './Cart.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce'
import { toVndString } from '../../utils/currencyUtil'
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
            const groupedCart = getCartGroupedByShop(cartInfor);
            console.log(groupedCart);
            setCartData(groupedCart);
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
    const getCartGroupedByShop = (cart) => {
        let groupedCart = [];
        if (cart.length > 0) {
            cart.map((cartItem) => {
                if (groupedCart.length === 0) {
                    const item = {
                        shopId: cartItem.shopId,
                        shopName: cartItem.shopName,
                        shopAddress: cartItem.address,
                        items: [cartItem]
                    }
                    groupedCart.push(item);
                } else {
                    const shopToAddCart = groupedCart.find((groupedCartItem) => groupedCartItem.shopId === cartItem.shopId);
                    if (shopToAddCart && shopToAddCart.items) {
                        shopToAddCart.items.push(cartItem);
                    } else {
                        const item = {
                            shopId: cartItem.shopId,
                            shopName: cartItem.shopName,
                            shopAddress: cartItem.address,
                            items: [cartItem]
                        }
                        groupedCart.push(item);
                    }
                }
            })
        }
        return groupedCart;
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
    const deleteSingle = (productId, variationId, price) => {
        const cart = localStorage.getItem("cart");
        if(cart != null 
            && cart.length > 0 
            && cart != '')
        {
            let cartList = JSON.parse(cart);
            let cartToUpdate = cartList.filter(function(item) {
                if (item['productId'] == productId && item['variationId'] == variationId && item['price'] == price) 
                    return false;
                return true;
            });
            const cartGroupedByShop = getCartGroupedByShop(cartToUpdate);
            setCartData(cartGroupedByShop);
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
        const cart = localStorage.getItem("cart");
        let cartProductList = JSON.parse(cart);
        let cartToUpdate = cartProductList.find((cartProduct) => cartProduct.productId == item.productId 
            && cartProduct.variationId == item.variationId);;
        if(cartToUpdate != null)
        {
            cartToUpdate.quantity = Number.parseInt(inputQuantity);
            cartToUpdate.price = Math.round(item.price,3);
            localStorage.setItem("cart" , JSON.stringify(cartProductList));
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

                {
                    cartData.length > 0 
                    ?   cartData.map((cartItemByShop) => {
                            return <>
                                <p style={{marginTop: '15px'}}><img src='/img/shop.svg' alt='shop' />{` ${cartItemByShop.shopName} - ${cartItemByShop.shopAddress}`}</p>
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
                                                console.log(cartItemByShop.items)
                                            }
                                            {cartItemByShop.items.map((item) => {                                                                 
                                                return (
                                                    <tr>
                                                        <td style={{width:"40%"}}>
                                                            <a className='cart_item_link' href={`/product_detail?productId=${item.productId}&variationId=${item.variationId}`}>
                                                                <img className='cart_item_img' src={item.image} />
                                                                {item.title}
                                                            </a>
                                                        </td>
                                                        <td style={{width:"20%"}}>{toVndString(item.price)}</td>
                                                        <td style={{width:"10%"}}>
                                                            <input 
                                                                onBlur={(e) =>{updateCartQuantity(e.target.value,item);}} 

                                                                style={{width:'60px',height:"40px",borderRadius:'5px',textAlign:"center",border:"1px solid var(--black-color)",}} 
                                                                type={'number'} 
                                                                defaultValue={item.quantity} />
                                                        </td>
                                                        <td style={{width:"25%"}}>{toVndString(Number.parseInt(item.price) * Number.parseInt(item.quantity))}</td>
                                                        <td style={{width:"5%"}}><button style={{backgroundColor:"var(--white-color)"}} onClick={() => {deleteSingle(item.productId, item.variationId,item.price)}}><img style={{width:'30px'}} src='/img/icons8-trash.svg'/></button></td>
                                                    </tr>
                                                )}
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </> 
                        })
                    :   <p style={{textAlign:'center'}}>Please add product to your cart</p>
                }

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
                                <div className='cart_total total_price_container'>
                                    <div className='total_price_title'>Total:</div>
                                    <div className='total_price_price'>{toVndString(totalPrice)}</div>
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