import React, { useState, useEffect } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import TodaySalesTimer from './TodaySalesTimer'
import { Container } from 'react-bootstrap'
import ProductList from '../ProductList/ProductList'
import ViewAllProductBtn from '../ViewAllProductBtn/ViewAllProductBtn'
import axiosClient from "../../../apis/axiosInstance";

function TodaySales() {
  const [products, setProducts] = useState('');
  useEffect(() => {
    axiosClient.get('/products', 
    {
        params:{
          limit:5
        }
    })
    .then(function (response) {   
        if(response.status == '200')
        {
          const productsFromApi = JSON.stringify(response.data);
          console.log("productsFromApi "+ productsFromApi);
          setProducts(JSON.parse(productsFromApi));
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
  }, [])
  return (
    <div className='today_sales_container'>
      <Container>
        <SectionTitle title={"Today's"}/>
        <TodaySalesTimer totalTime={88000}/>
        <ProductList products={products}/>
        <ViewAllProductBtn />
      </Container>
    </div>
  )
}

export default TodaySales