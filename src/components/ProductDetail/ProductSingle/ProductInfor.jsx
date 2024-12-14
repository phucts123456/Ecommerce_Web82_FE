import React from 'react'
import { useState, useRef } from 'react';
import AdvImage from '../../HomePage/AdvImage/AdvImage';
import {checkProductStock} from '../../../apis/product';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
import { Link } from 'react-router-dom';
function ProductInfor({name,rating,price,description,image,id,category,discount, variationList, selectedVariation}) {
  const [inputValue, setInputValue] = useState(1);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState([]);
  const maxRating = 5;
  const calculatePrice = () => {
    const productPrice = selectedVariation ? selectedVariation.price : price;
    console.log("productPrice")
    console.log(selectedVariation)
    return discount > 0 ? Math.round(productPrice - ((productPrice * discount) / 100),3) : Math.round(productPrice,3);
  }
  const getRatting = () => {
    let a = [];
    for (let index = 1; index <= maxRating; index++) {
        a.push((index <= rating.rate)
            ? <img className='product_item_rating_star_image' src='/img/golden_star.svg'></img> 
            : <img className='product_item_rating_star_image' src='/img/grey_star.svg'></img>);
    }
    return a;
}
function isDecimal(num) {
  return (num ^ 0) !== num;
}
function addCart(productId, name, image, inputQuantity,discount,price, vId)
{
  setMessage("");

  let isLoggedIn = localStorage.getItem("accessToken") != null;
  
  if(!isLoggedIn) 
  {
    window.location.href = '/login';
    return;
  }

  if(inputQuantity < 1 || isDecimal(Number.parseFloat(inputQuantity))) 
  {
    alert("Quantity must larger or equal to 1 or without decimal parts");
    return;
  }
  checkProductStock(id, inputQuantity).then((response) => {
    if (response.status === 200) {
      const cart = localStorage.getItem("cart");
      if(cart == null || cart == '')
      {
        localStorage.removeItem("applyCoupon");
        var cartProduct = {
          productId: id,
          variationId: vId,
          title: name,
          price: calculatePrice(),
          quantity: inputQuantity,
          discount: discount,
          image: image
        }
        let cartProductList = [];
        cartProductList.push(cartProduct);
        localStorage.setItem("cart" , JSON.stringify(cartProductList));
        const cartAfterAdd = localStorage.getItem("cart");
        console.log('Cart Nay:'+ cartAfterAdd);
      }
      else
      {
        console.log("cart not null");
        let cartProductList = JSON.parse(cart);
        console.log("cartProductList ");
        console.log(cartProductList);
        let cartToUpdate = cartProductList.find((cartProduct) => cartProduct.productId == productId && cartProduct.price == Math.round(price));
        console.log("cartToUpdate ");
        console.log(cartToUpdate);
        if(cartToUpdate != null)
        {
          console.log("cart khac null");
          var tempCartProductList = cartProductList.filter((product) => product.productId != productId);
          console.log("tempCartProductList " + tempCartProductList);
          cartToUpdate.quantity = Number.parseInt(cartToUpdate.quantity) + Number.parseInt(inputQuantity);
          cartToUpdate.price = calculatePrice();
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
      }
      window.location.href = "/cart";
    }
  }).catch((error) => {
    setMessage(error.response.data.message);
  })
}

function handleClick(action) 
{
  if(action === 'add')
  {
      setInputValue(inputValue + 1);
  }
  else if(inputValue > 1)
  {
      setInputValue(inputValue -1);
  }
}
  return (
    <div className='product_info_container'>
        <h2 className='product_info_name'>{name}{selectedVariation && ` - ${selectedVariation.name}`}</h2>
        <Row gutter={0}>
          {
            variationList 
              && variationList.map((variation) => {
                return (
                  <Col span={8}>
                    <a style={{textDecoration:'none'}} href={`/product_detail?productId=${id}&variationId=${variation._id}`}>
                    <Card
                      hoverable                       
                      style={{ width: 150, display: 'flex' }}
                    >
                          <div style={{display: 'flex'}}>
                            <img style={{ width: "50%" }} alt="example" src={variation.image} />
                            <Meta style={{ width: "50%" }} title={`${variation.name}`} description={`$${variation.price}`} />
                          </div>
                        </Card>
                    </a>
                  </Col>
                )                                   
              })
          }
        </Row>
        <div className='product_info_ratting'>
            <div className="product_item_rating_star">{getRatting()}</div>
            <div className="product_item_rating_count">({rating.count} reviews)</div>
        </div>
        <div className='product_info_price'>${calculatePrice()}</div>
        <div className='product_info_desc'>{description}</div>
        <div className='product_info_quantity_and_buy'>
            <div className='product_info_quantity'>
              <button onClick={() =>{handleClick("sub")}}  className='product_info_quantity_btn product_info_quantity_sub_btn'>-</button>
              <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} className="product_info_quantity_input" type={'number'} />
              <button onClick={() =>{handleClick("add")}}  className='product_info_quantity_btn product_info_quantity_add_btn'>+</button>
            </div>
            <div className='product_info_buy' onClick={() => {addCart(id,selectedVariation ? `${name} - ${selectedVariation.name}` : name,selectedVariation ? selectedVariation.image : image,inputValue <= 0 ? 0 : inputValue,discount,price, selectedVariation ? selectedVariation._id : id)}}><button>Buy Now</button></div>
        </div>
        {message !== ''&& <p style={{color:'red'}}>{message}</p>}
        <AdvImage img={'/img/service_product_detail.png'} />
    </div>
  )
}

export default ProductInfor