import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './pages/HomePage/HomePage.jsx'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import NotFound from './pages/NotFound/NotFound.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx'
import Cart from './pages/Cart/Cart.jsx'
import ProductList from './pages/ProductList/ProductList.jsx'
import Footer from './components/Footer/Footer.jsx'
import CheckOut from './pages/CheckOut/CheckOut.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import OrderHistoryList from './pages/OrderHistoryList/OrderHistoryList.jsx'
import HistoryDetail from './pages/HistoryDetail/HistoryDetail.jsx'
library.add(faMagnifyingGlass,faCartShopping,faCircleUser);
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route exact path='/' Component={HomePage} />
      <Route path='/product_detail' Component={ProductDetail} />
      <Route path='/product_list' Component={ProductList} />
      <Route path='/cart' Component={Cart} />
      <Route path='/check_out' Component={CheckOut} />
      <Route path='/login' Component={Login} />
      <Route path='/register' Component={Register} />
      <Route path='/order_history_list' Component={OrderHistoryList} />
      <Route path='/order_history_detail' Component={HistoryDetail} />
      <Route exact path='*' Component={NotFound} />
    </Routes> 
    <Footer /> 
  </BrowserRouter>,
)
