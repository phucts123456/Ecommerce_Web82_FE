import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductItem from '../../components/HomePage/ProductList/ProductItem';
import './ProductList.css'
import { getProductList } from '../../apis/product';
import constants from '../../data/constants';
import { useContext } from 'react';
import UserContext from '../../context/userContext';
function ProductList() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const searchKey = searchParams.get("sk") != null ? searchParams.get("sk")  : "";
  const pageNumber = searchParams.get("pn") != null ? searchParams.get("pn")  : 1;
  const category = searchParams.get("c") != null ? searchParams.get("c")  : "";
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(UserContext);
  useEffect(() => {
    setIsLoading(true);
    const productList = getProductList(pageNumber, searchKey, category, constants.CONST_PRODUCT_PER_PAGE).then((response) => {
      console.log("response.data.data.items");
      console.log(response.data.data.items);
      setProducts(response.data.data.items);
      setTotalPage(response.data.data.totalPage);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    }
    );
  }, [])

  const getPagination = () => 
  {
    let links = [];
    for (let index = 1; index <= totalPage; index++) {
        if(pageNumber == index)
        {
            links.push(<Button className='active page_index' href={`/product_list?pn=${index}`}>{index}</Button>)
        }
        else { 
            links.push(<Button className='page_index' href={`/product_list?pn=${index}`}>{index}</Button>)
        }
    }
    return links;
  }
  const handleSelectChange = (value) => {
    let sortedProduct = [];
    switch (value) {
      
      case 'name_desc':
        sortedProduct = products.sort(function(a,b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
        console.log("sortedProduct ");
        setProducts(sortedProduct.slice());
      break;
      case 'name_asc':
        sortedProduct = products.sort(function(a,b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
        console.log("sortedProduct ");
        setProducts(sortedProduct.slice());
      break;
      case 'price_desc':
        sortedProduct = products.sort(function(a,b) {
          const price_a = Number.parseInt(a.price);
          const price_b = Number.parseInt(b.price);
          if (price_a > price_b) {
            return -1;
          }
          if (price_a < price_b) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
        console.log("sortedProduct ");
        setProducts(sortedProduct.slice());
      break;
      case 'price_asc':
        sortedProduct = products.sort(function(a,b) {
          const price_a = Number.parseInt(a.price);
          const price_b = Number.parseInt(b.price);
          if (price_a < price_b) {
            return -1;
          }
          if (price_a > price_b) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
        console.log("sortedProduct ");
        setProducts(sortedProduct.slice());
      break;
    
      default:
        break;
    }
  } 
  return (
    <>  <div className='product_list_container'>
    <Container>
      <div className="filter_bar">
        <h3>Product List</h3>
        <div className='product_list_filter'>
          <p className='product_list_filter_title'>Sort by</p>
          <select className='product_list_filter_ddl' defaultValue='' onChange={(e) => handleSelectChange(e.target.value)} >
            <option value=""></option>
            <option value="name_desc">Desceding Name</option>             
            <option value="name_asc">Ascending Name</option>             
            <option value="price_desc">Desceding Price</option>             
            <option value="price_asc">Ascending Price</option>             
          </select>
        </div>
      </div>
        <div className='product_list'>
        {
            products != "" ?
            products?.map((item) => {
            return <ProductItem 
                title={item.name} 
                discount={""} 
                image={item.image} 
                price={item.price} 
                rating={item.rate} 
                id={item._id}/>
            }) : ""
        }
        </div>
        {
          isLoading === false
          ? products.length > 0 ?
            <div className='product_pagination'>
              <Button href={`/product_list?pn=${Number.parseInt(pageNumber)-1}`} className='change_page_btn' disabled={pageNumber == 1 ? true: false}>Back</Button>
              {
                  getPagination()
              }
              <Button href={`/product_list?pn=${Number.parseInt(pageNumber)+1}`} className='change_page_btn' disabled={pageNumber == totalPage ? true: false}>Next</Button>
            </div> : <p style={{color:'red'}}>No product found</p>
          : 
          <>
            <div class="loading">
              Loading&#8230;
            </div>
            <div class="content">
            </div>
          </>
        }
    </Container>
   
</div></>
  
  )
}

export default ProductList
