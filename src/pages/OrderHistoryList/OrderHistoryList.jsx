import React,{useState} from 'react'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getOrderHistory } from '../../apis/order';
import './OrderHistoryList.css'
import constants from '../../data/constants';
function OrderHistoryList() {
    const [ orderList, setOrderList] = useState([]);
    useEffect(() => {
        getOrderHistory().then((response) => {
            setOrderList(response.data.data.items);
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 401) {
                localStorage.removeItem("accessToken");
                localStorage.setItem("msg", "Login session is end. Please login again.")
                navigate("/login");
            }
        })
        let orderList = localStorage.getItem('order') != null ? JSON.parse(localStorage.getItem('order')) : null;
        if(orderList != null)
        {
            let loginUser = localStorage.getItem("loginUser") != null 
            ? JSON.parse(localStorage.getItem("loginUser")) 
            : null;
            let userId = '';
            if(loginUser != null) userId = loginUser.userId;
            let userOrder =  orderList.filter((order) => order.user.userId == userId);          
            setOrderList(userOrder);
        }
    }, []);
    const viewOrderDetail = (orderId) => {
        window.location.href = `/order_history_detail?orderId=${orderId}`
    }
    const getOrderStatus = (status) => {
        switch (status) {
            case constants.CONST_ORDER_STATUS_ORDERED:
                return constants.CONST_ORDER_STATUS_ORDERED_TEXT
                break;
                case constants.CONST_ORDER_STATUS_WATTING_FOR_PAYMENT:
                return constants.CONST_ORDER_STATUS_WATTING_FOR_PAYMENT_TEXT
                break;            
                case constants.CONST_ORDER_STATUS_SHIPPING:
                return constants.CONST_ORDER_STATUS_SHIPPING_TEXT
                break;            
                case constants.CONST_ORDER_STATUS_SHIPPED:
                return constants.CONST_ORDER_STATUS_SHIPPED_TEXT
                break;           
                    case constants.CONST_ORDER_STATUS_COMPLETE:
                return constants.CONST_ORDER_STATUS_COMPLETE_TEXT_TEXT
                break;            
                case constants.CONST_ORDER_STATUS_ACCEPTED:
                return constants.CONST_ORDER_STATUS_ACCEPTED_TEXT
                break;        
            default:
                break;
        } 
    }
    return (
        <div className='order_history_list_container'>
            <Container>
                <div className='product_detail_category'>
                    {'Home > OrderHistoryList'}
                </div>
                <div className='cart_list_container'>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Order Id</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            (orderList.length >= 0) 
                                && orderList 
                                && orderList != '' 
                                ? orderList.map((item) =>{                             
                                    return (
                                    <>
                                        <tr className='order_history_row' onClick={() => viewOrderDetail(item._id)}>
                                            <th scope="row">
                                                {item._id}
                                            </th>
                                            <td>{new Date(item.orderDate).toLocaleDateString() }</td>
                                            <td>{item.email}</td>
                                            <td>{getOrderStatus(item.status)}</td>
                                            <td>{item.totalPrice}</td>
                                        </tr>
                                    </>)}) 
                                :  ""
                        }                
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    )
}

export default OrderHistoryList
