import React from 'react'
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js';
import style from './home.module.css';



const Home = () => {

    const dispatch = useDispatch()

useEffect(()=>{
dispatch(getProducts())
},[])

const informacion = useSelector(state => state.productsHome)


    return (
      <div className={style.div}>
          <h2 ></h2>
            <div >
                {informacion.map((Element) => {
                    return <div className={style.divInfo} >                        
                              <img  src={Element.URL}  className={style.img}/> 
                              <h3 >{Element.nombre}</h3>                          
                              <h4 >{Element.marca}</h4>                    
                              <h4>precio : {Element.precio}</h4>
                              <h4>talla : {Element.talla }</h4>
                           </div>
                })}
            </div>
      </div>
    )

}



export default Home


