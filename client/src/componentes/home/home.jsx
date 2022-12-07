import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js'


const Home = () => {

    const dispatch = useDispatch()

useEffect(()=>{
dispatch(getProducts())
},[])


    return (
      <div></div>
    )

}



export default Home