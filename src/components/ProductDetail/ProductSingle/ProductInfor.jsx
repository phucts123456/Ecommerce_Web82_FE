import { Button } from 'bootstrap';
import React from 'react'
import { useState, useRef } from 'react';
import AdvImage from '../../HomePage/AdvImage/AdvImage';
function ProductInfor({title,rating,price,description,image,id,category,discount}) {
  const [inputValue, setInputValue] = useState(1);
  const maxRating = 5;
  const calculatePrice = () => {
    return discount > 0 ? Math.round(price - ((price * discount) / 100),3) : Math.round(price,3);
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
function addCart(productId, title, image, inputQuantity,discount,price)
{
  let loginUser = localStorage.getItem("loginUser") != null 
    ? JSON.parse(localStorage.getItem("loginUser")) 
    : null;
  if(loginUser == null) 
  {
    window.location.href = '/login';
    return;
  }

  if(inputQuantity < 1 || isDecimal(Number.parseFloat(inputQuantity))) 
  {
    alert("Quantity must larger or equal to 1 or without decimal parts");
    return;
  }
  const cart = localStorage.getItem("cart");
  if(cart == null || cart == '')
  {
    localStorage.removeItem("applyCoupon");
    var cartProduct = {
      productId: productId,
      title: title,
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
          productId: productId,
          title: title,
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
        <h2 className='product_info_name'>{title}</h2>
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
            <div className='product_info_buy' onClick={() => {addCart(id,title,image,inputValue <= 0 ? 0 : inputValue,discount,price)}}><button>Buy Now</button></div>
        </div>
        <AdvImage img={'/img/service_product_detail.png'} />
    </div>
  )
}

export default ProductInfor