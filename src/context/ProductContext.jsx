import {React, useState, useEffect } from 'react'
import { ProductContext } from '.'
import axiosClient from "../apis/axiosInstance";

const StoreComponent = (props) => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
      axiosClient.get('/pokemon/')
      .then(function (response) {
        const newPokemon = response?.data?.results.map((item) => {
            return {
                ...item,
                image: '/img/001.png'
            }
        })
        setPokemons(newPokemon);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }, [])

  return (
    <StoreContext.Provider value={{pokemons,setPokemons}}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreComponent
