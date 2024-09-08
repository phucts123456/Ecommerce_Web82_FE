import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axiosClient from '../../apis/axiosInstance';
import ProductItem from '../../components/HomePage/ProductList/ProductItem';
import './ProductList.css'
import { Link } from 'react-router-dom';
import { Select} from 'antd'
function ProductList() {
  const productPerPage = 15;
  let [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const category = searchParams.get("category");
  const title = searchParams.get("title");
  const page = searchParams.get("page") != null ? searchParams.get("page")  : 1;
  useEffect(() => {
    let endPoint = category != null ? `/products/category/${category}` : '/products'
    axiosClient.get(endPoint)
    .then(function (response) {   
        if(response.status == '200')
        {
          const productsFromApi = JSON.stringify(response.data);
          let productList = JSON.parse(productsFromApi);
          setTotalPage(Math.ceil(productList.length / productPerPage));
          let productListPaginated = productList.slice((page - 1) * productPerPage, page * productPerPage);
          if(title != null)
          {
            productListPaginated = productListPaginated.filter(function(product) {
              if (product['title'].toLowerCase().includes(title)) 
              {
                return true;
              }
              return false;
            });
            setTotalPage(Math.ceil(productListPaginated.length / productPerPage));
          }
          setProducts(productListPaginated);
        }
        else
        {
          console.log("status not 200: "+ response);
        }
      })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
    });
  }, [page])

  const getPagination = () => 
  {
    let links = [];
    for (let index = 1; index <= totalPage; index++) {
        if(page == index)
        {

            links.push(<Button className='active page_index' href={`/product_list?page=${index}`}>{index}</Button>)
        }
        else { 
            links.push(<Button className='page_index' href={`/product_list?page=${index}`}>{index}</Button>)
        }
    }
    return links;
  }
  const handleSelectChange = (value) => {
    let sortedProduct = [];
    switch (value) {
      
      case 'name_desc':
        sortedProduct = products.sort(function(a,b) {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          return 0;
        });
        console.log("sortedProduct ");
        setProducts(sortedProduct.slice());
      break;
      case 'name_asc':
        sortedProduct = products.sort(function(a,b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
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
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
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
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
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
                title={item.title} 
                discount={""} 
                image={item.image} 
                price={item.price} 
                rating={item.rating} 
                id={item.id}/>
            }) : ""
        }
        </div>
        {
          products != "" 
          ?
            <div className='product_pagination'>
              <Button href={`/product_list?page=${Number.parseInt(page)-1}`} className='change_page_btn' disabled={page == 1 ? true: false}>Back</Button>
              {
                  getPagination()
              }
              <Button href={`/product_list?page=${Number.parseInt(page)+1}`} className='change_page_btn' disabled={page == totalPage ? true: false}>Next</Button>
            </div>
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
