import React from "react";

import { useEffect  } from "react";
import { useDispatch , useSelector } from 'react-redux';
import { searchXname } from '../../redux/actions/actions.js';

import style from './productos.module.css'



const SearchXname = (props) => {



const dispatch = useDispatch()


useEffect(()=>{
dispatch(searchXname(props.match.params.id))
},[props.match.params.id, dispatch])


 
const informacion = useSelector(state => state.productsXname)
  
    return (
        <div className={style.div}>
            <h2  >{` ${props.match.params.id}`}</h2>
            <div  className={style.divContenedor}>
                {informacion.map((Element) => {
                    return <div className={style.divInfo}>                        
                              <img  src={Element.URL} className={style.img} />                           
                              <h3 >{Element.marca}</h3>                    
                              <h4>precio : {Element.precio}</h4>
                              <h4>talla : {Element.talla }</h4>
                           </div>
                })}
            </div>
        </div>
    )
}


export default SearchXname;