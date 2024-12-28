import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { Container } from 'react-bootstrap'
import './CheckOut.css'
import { Button, Radio, Space } from 'antd'
import { createOrder } from '../../apis/order';
import constants from '../../data/constants'
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Select } from "antd";
import { getDistricts, getProvinces, getShippingFee, getWards } from "../../apis/shipping";
import { toVndString } from '../../utils/currencyUtil';
import UserContext from '../../context/userContext';
import webMessges from '../../data/webMessage'
import { createPaymentUrl } from '../../apis/payment/paymentVnpay'

function CheckOut() {
    const [ cartData, setCartData] = useState([]);
    const [ subTotal, setSubtotal] = useState(0);
    const [ discountPrice, setDiscountPrice] = useState(0);
    const [ totalOrder, setTotalOrder] = useState(0);
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
    const [ errorProvince, setErrorProvince] = useState('');
    const [ errorDistrict, setErrorDistrict] = useState('');
    const [ errorWard, setErrorWard] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken") != null);
    const navigate = useNavigate();
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState(0);
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [shopShippingFees, setShopShippingFees] = useState([]);
    const [message, setMessage] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const userContext = useContext(UserContext);
    const [errorPayment, setErrorPayment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        if(!isLogin) navigate("/login");
        const cart = localStorage.getItem("cart");
        console.log("cart "+ typeof cart)
        if(cart != null && cart != '')
        {
            let cartInfor = JSON.parse(cart);
            const groupedCart = getCartGroupedByShop(cartInfor);
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
        getProviceList();
    }, [])
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
    const getProviceList = async () => {
        const response = await getProvinces();
        if (response.status === 200) {
            console.log(response.data)
            setProvinceList(response.data.data);
        } else {
            console.log(response.data)
        }
    }
    const calculateSubTotal = (cartInfor, shopId) => {
        let subTotalPrice = 0;
        cartInfor?.map((cart) =>{
            subTotalPrice += Number.parseInt(cart.price) * Number.parseInt(cart.quantity);           
        })
        const result = subTotalPrice + getShippingFeeByShopId(shopId);
        return result;   
    }

    const calculateOrderTotal = () => {
        let orderTotal = 0;
        cartData.map((cart) =>{
            cart.items.map((item) =>{
                orderTotal += Number.parseInt(item.price) * Number.parseInt(item.quantity);           
            }) 
            orderTotal += getShippingFeeByShopId(cart.shopId)       
        })
        return orderTotal;   
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
        const validateStreetAddress = isLength(streetAddress, 'Street address', 5);
            setErrorStreetAddress(validateStreetAddress != '' ? validateStreetAddress : '');
        const validatePhoneNumber = isLength(phoneNumber, 'Phone number', 10);
            setErrorPhoneNumber(validatePhoneNumber != '' ? validatePhoneNumber : '');
        const validateEmail = isLength(email, 'Email', 5);
            setErrorEmail(validateEmail != '' ? validateEmail : '');
        const validateApartment = apartment.length > 0 ? isLength(apartment, 'Apartment', 5) : '';
            setErrorApartment(validateApartment != '' ? validateApartment : '');
        console.log("selectedProvince")
        console.log(selectedProvince)
        const validateProvince = selectedProvince === '' ? "Please select province" : '';
            setErrorProvince(validateProvince != '' ? validateProvince : '');
        const validateDistrict = selectedDistrict === '' ? "Please select district" : '';
            setErrorDistrict(validateDistrict != '' ? validateDistrict : '');
        const validateWard = selectedWard === '' ? "Please select ward" : '';
            setErrorWard(validateWard != '' ? validateWard : '');
        const result = validateFullName != '' 
            || validateStreetAddress != '' 
            || validatePhoneNumber != '' 
            || validateEmail != '' 
            || validateApartment != ''
            || validateProvince != ''
            || validateDistrict != ''
            || validateWard != '';
        console.log(result)
        return result;
    }

    const validatePaymennt = () => {
        console.log("paymentMethod")
        console.log(paymentMethod)
        if (paymentMethod === undefined || paymentMethod === null || paymentMethod === '') {
            setErrorPayment(webMessges.MESSAGE_NO_PAYMENT_SELECTED_ERROR)
            return true;
        }
        return false;
    }

    const getOrderStatus = () => {
        if (paymentMethod === null) return ""
        if (paymentMethod === constants.CONST_ORDER_PAYMENT_CODE_COD)
            return constants.CONST_ORDER_STATUS_ORDERED
        else if (paymentMethod === constants.CONST_ORDER_PAYMENT_CODE_VNPAY)
            return constants.CONST_ORDER_PAYMENT_CODE_VNPAY
    }

    const completeOrder = async () => {
        setIsLoading(true);
        let isError = validateUserInfor() 
            || validatePaymennt();
        console.log(isError);
        if(isError === false){
            isError = validateFormat();
        }
        if(isError != '') return;
        let orderList = [];
        for(const order of cartData) {
            const newOrder  = {
                streetAddress:streetAddress,
                shopId:order.shopId,
                status: getOrderStatus(),
                email:email,
                phoneNumber:phoneNumber,
                apartment:apartment,
                provinceId: selectedProvince,
                districtId: selectedDistrict,
                wardId: selectedWard,
                items: order.items,
                subTotal:calculateSubTotal(order.items),
                shippingFee: getShippingFeeByShopId(order.shopId),
                totalPrice:calculateSubTotal(order.items,order.shopId),
                orderDate: (new Date()).toDateString(),
                userId:userContext.userContext.user._id,
            }
            orderList.push(newOrder);
        }
        createOrder(orderList).then((res) =>{
            console.log(res)
            if(isError == false 
                && res.status === 201)
            {
                const orderIds = res.data.data.orderIds.join(',');
                if (paymentMethod === constants.CONST_ORDER_PAYMENT_CODE_COD) {

                    doOrderSuccessProcess();
                }
                else if (paymentMethod === constants.CONST_ORDER_PAYMENT_CODE_VNPAY) {
                    createPaymentUrl(orderIds, calculateOrderTotal()).then((res) =>{
                        if (res.status === 200) {
                            if (res.data.data.url) {
                                console.log("res.data.data.url")
                                console.log(res.data.data.url)
                                window.location.replace(res.data.data.url);
                            }
                            else 
                            {
                                setErrorPayment(webMessges.MESSAGE_CREATE_PAYMENT_URL_VNPAY_ERROR);
                                return;
                            }
                        }
                    })
                }
            }
        }).catch((error) =>{
            console.log(error)
            if (error.response) {
                console.log('Unauthorized. out of session')
                console.log(401)
                navigate('/login', {replace: true})
            } else {
                console.log(error.response)
            }
        }).finally(()=>{
            //localStorage.removeItem("cart");
            setIsLoading(false);
        });
    }

    const handleSelectProvince = (value) => {
        setSelectedProvince(value);
        getDistricts(value).then((response) => {
          setDistrictList(response.data.data);
        }).catch((error) => {
          console.log(error.data)
        })
    }
    
    const handleSelectDistrict = (value) => {
        console.log("value district")
        console.log(value)
        setSelectedDistrict(Number.parseInt(value));
        getWards(value).then((response) => {
            console.log(response.data.data)
            setWardList(response.data.data);
        }).catch((error) => {
            console.log(error)
        })
    };
    const handleSelectWard = async (value) => {
        console.log("value district")
        console.log(value)
        setSelectedWard(value);
        if (value === '') setShopShippingFees([]);
        let shopIds = []
        if (cartData.length > 0) {
            for (const cart of cartData) {
                shopIds.push(cart.shopId);
            }
        }
        console.log("shopIds")
        console.log(shopIds)
        if (shopIds.length > 0) {
            const requestData = {
                userAddress: {
                    wardCode: value,
                    districtId: Number.parseInt(selectedDistrict)
                },
                shopIds: shopIds
            }
            const response = await getShippingFee(requestData);
            console.log(response);
            setShopShippingFees(response.data.data.shopShippingsFee);
        }
      };

      const getShippingFeeByShopId = (shopId) => {
        if (selectedWard === '') return 0;
        if (shopShippingFees.length === 0) return;
        const shippingFee = shopShippingFees.find((shopShippingFee) => shopShippingFee.shopId === shopId);
        if (shippingFee) {
            return shippingFee.fee;
        } else {
            return 0;
        }
      }

      const handleSelectPayment = (value) => {
        setErrorPayment("");
        setPaymentMethod(value)
      }

      const doOrderSuccessProcess = () => {
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            window.location.href = "/order_history_list";
        },2000);
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
                <div className='check_out_btn_continer'>
                    <Button onClick={() => completeOrder()} className='check_out_btn' >Complete Order</Button>                      
                </div> 
                <div className='check_out_info'>
                    <div className='check_out_user_info'>
                        <div className='check_out_user_info_input check_out_user_info_first_name'>
                            <label htmlFor="fullName">Full Name</label>
                            <input onChange={(e) => setFullName(e.target.value)} id='fullName'/>
                            <p style={{color:'red'}}>{errorFullName}</p>  
                        </div>       
                        <div className='check_out_user_info_input check_out_user_info_province'>
                            <label htmlFor="province">Province</label>
                            <select name="province" id="province" onChange={(e) => handleSelectProvince(e.target.value)}>
                            <option value="">{provinceList.length > 0 ? "Please select province" : ""}</option>
                                {provinceList && provinceList.map((item) =>  <option value={item.ProvinceID}>{item.ProvinceName}</option>)}
                            </select>
                            <p style={{color:'red'}}>{errorProvince}</p>  
                        </div>               
                        <div className='check_out_user_info_input check_out_user_info_district'>
                            <label htmlFor="district">{`District(Please select province frist)`}</label>
                            <select name="district" id="district" onChange={(e) => handleSelectDistrict(e.target.value)}>
                                <option value="">{districtList.length > 0 ? "Please select district" : ""}</option>
                                {districtList && districtList.map((item) =>  <option value={item.DistrictID}>{item.DistrictName}</option>)}
                            </select>
                            <p style={{color:'red'}}>{errorDistrict}</p>  
                        </div> 
                        <div className='check_out_user_info_input check_out_user_info_ward'>
                            <label htmlFor="ward">{`Ward(Please select district frist)`}</label>
                            <select name="ward" id="ward" onChange={(e) => handleSelectWard(e.target.value)}>
                                <option value="">{wardList.length > 0 ? "Please select ward" : ""}</option>
                                {wardList && wardList.map((item) =>  <option value={item.WardCode}>{item.WardName}</option>)}
                            </select>
                            <p style={{color:'red'}}>{errorWard}</p>  
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
                        {
                            console.log(cartData)
                        }
                        {
                            cartData.map((cartItemByShop) => {
                                return <>
                                    <p style={{marginTop: '15px'}}><img src='/img/shop.svg' alt='shop' />{` ${cartItemByShop.shopName} - ${cartItemByShop.shopAddress}`}</p>
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
                                                    cartItemByShop.items.length > 0 && cartItemByShop.items.map((item) =>{                             
                                                        return (                                                    
                                                            <tr>
                                                                <th scope="row">
                                                                    <a className='cart_item_link' href={`/product_detail?productId=${item.productId}&discount=${item.discount}`}>
                                                                        <img className='cart_item_img' src={item.image} />
                                                                        {item.title}
                                                                    </a>
                                                                </th>
                                                                <td>{toVndString(Number.parseInt(item.price) * Number.parseInt(item.quantity))}</td>
                                                            </tr>       
                                                    )}) 
                                                } 
                                                <tr>
                                                    
                                                </tr>             
                                            </tbody>
                                        </table>
                                        <div className='subtotal_container'>
                                            <h2 className='subtotal_title'>
                                                Cart total
                                            </h2>
                                            <div className='cart_total subtotal_price'>
                                                <div className='subtotal_price_title'>Subtotal:</div>
                                                <div className='subtotal_price_price'>{cartItemByShop.items.length ? 
                                                toVndString(calculateSubTotal(cartItemByShop.items)) : 0}</div>
                                            </div>
                                            <div className='cart_total discount_price'>
                                                <div className='discount_price_title'>Discount:</div>
                                                <div className='discount_price_price'>{discountPrice} VND</div>
                                            </div>
                                            <div className='cart_total subtotal_shipping_fee_container'>
                                                <div className='subtotal_shipping_fee_title'>Shipping:</div>
                                                <div className='subtotal_shipping_fee_price'>{toVndString(getShippingFeeByShopId(cartItemByShop.shopId))}</div>
                                            </div>
                                            <div className='cart_total total_price_container'>
                                                <div className='total_price_title'>Total:</div>
                                                <div className='total_price_price'>{cartItemByShop.items.length ? 
                                                toVndString(calculateSubTotal(cartItemByShop.items,cartItemByShop.shopId)) : 0}</div>
                                            </div>
                                            </div>  
                                    </div>
                                </>
                            })
                        }
                        <div className='cart_list_container subtotal_container'>
                            <h2 className='subtotal_title'>
                                Payment method:
                            </h2>
                            <p style={{color:'red'}}>{errorPayment}</p>  
                            <div className='cart_total subtotal_price'>
                                <div className='subtotal_price_title'>
                                <Radio.Group onChange={(e) => handleSelectPayment(e.target.value)}>
                                    <Space direction="vertical">
                                        <Radio value={constants.CONST_ORDER_PAYMENT_CODE_COD}>
                                            {constants.CONST_ORDER_PAYMENT_TEXT_COD}
                                        </Radio>
                                        <Radio value={constants.CONST_ORDER_PAYMENT_CODE_VNPAY}>
                                            {constants.CONST_ORDER_PAYMENT_TEXT_VNPAY}
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className='cart_list_container subtotal_container'>
                            <h2 className='subtotal_title'>
                                Order total
                            </h2>
                            <div className='cart_total subtotal_price'>
                                <div className='subtotal_price_title'>Total:</div>
                                <div className='subtotal_price_price'>{toVndString(calculateOrderTotal())}</div>
                            </div>
                        </div>
                        <div className='check_out_btn_continer'>
                            <Button onClick={() => completeOrder()} className='check_out_btn' >Complete Order</Button>                      
                        </div> 
                    </div>
                </div>
            </Container> 
        </div>
        {
            isLoading &&           
            <>
            <div class="loading">
              Loading&#8230;
            </div>
            <div class="content">
            </div>
          </>
        }
    </>

  )
}

export default CheckOut
