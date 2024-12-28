import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductItem from '../../components/HomePage/ProductList/ProductItem';
import { getProductList } from '../../apis/product';
import constants from '../../data/constants';
import { useContext } from 'react';
import UserContext from '../../context/userContext';
function OrderComplete() {
    let [searchParams, setSearchParams] = useSearchParams();
    const returnCode = searchParams.get("vnp_ResponseCode") != null ? searchParams.get("vnp_ResponseCode")  : "";
    const orderId = searchParams.get("vnp_TxnRef") != null ? searchParams.get("vnp_TxnRef")  : "";
    const [successOrders, setSuccessOrders] = useState(returnCode === '00' && orderId != null)
    return <>
    <div className='product_list_container'>
        <Container>
            <h1>You have successfully create order.</h1>
                <p>Your orders: {decodeURIComponent(orderId)}</p>
                <p>Please visit     
                    <a href='/order_history_list'> order history </a> 
                    page see order detail.
            </p>
        </Container>
    </div>
    </>
}

export default OrderComplete