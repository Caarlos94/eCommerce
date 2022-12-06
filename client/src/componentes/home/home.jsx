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
        <h1>soy home</h1>
    )

}



export default Home