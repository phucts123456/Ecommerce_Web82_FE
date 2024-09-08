import React from 'react'
import { Link } from 'react-router-dom';

function ProductItem({title, price, description, category, image, rating, discount,id }) {
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
    return (
      <div className='product_item_container'>  
  
        <Link to={`/product_detail?productId=${id}&discount=${discount}`}>
          <div className='product_item_image_discount_container'>
            <img className='product_item_image' src={image} alt={title} />
            {discount != '' && discount != null ? <div className='product_item_discount'>-{discount}%</div> : ''}
          </div>
          <div className='product_item_name_price_rating_container'>
            <div className="product_item_name">
                {title}
            </div>
            <div className="product_item_price">
                <p className='product_item_price_after_dicount'>${calculatePrice()}</p>
                <p className='product_item_price_before_dicount'>{discount > 0 ? `$${price}` : ''}</p>
            </div>
            <div className="product_item_rating">
                <div className="product_item_rating_star">{getRatting()}</div>
                <div className="product_item_rating_count">({rating.count})</div>
            </div>
          </div>
        </Link>
    </div>  
  )
}

export default ProductItem
