import React, { useState, useEffect } from 'react'
import SectionTitle from '../SectionTitle/SectionTitle'
import TodaySalesTimer from './TodaySalesTimer'
import { Container } from 'react-bootstrap'
import ProductList from '../ProductList/ProductList'
import ViewAllProductBtn from '../ViewAllProductBtn/ViewAllProductBtn'
import { getProductList } from '../../../apis/product';

function TodaySales() {
  const [products, setProducts] = useState('');
  useEffect(() => {
    // axiosClient.get('/products', 
    // {
    //     params:{
    //       limit:5
    //     }
    // })
    // .then(function (response) {   
    //     if(response.status == '200')
    //     {
    //       const productsFromApi = JSON.stringify(response.data);
    //       console.log("productsFromApi "+ productsFromApi);
    //       setProducts(JSON.parse(productsFromApi));
    //     }
    //     else
    //     {
    //       console.log("status not 200: "+ response);
    //     }
    //   })
    // .catch(function (error) {
    //     console.log(error);
    // })
    // .finally(function () {
    // });
    const productList = getProductList(1, "", 4).then((response) => {
      if(response.data.data) {
        console.log("response.data.data.items")
        console.log(response.data.data.items)
        setProducts(response.data.data.items);
      }
    }).catch((error) => {
      console.log(error)
    }
    );
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