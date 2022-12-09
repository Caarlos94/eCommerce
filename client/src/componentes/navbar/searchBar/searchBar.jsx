import React from "react";
import style from './searcBar.module.css'
import { useState } from "react";
import { searchXname } from '../../../redux/actions/actions.js';
import { useDispatch } from 'react-redux';


const SearchBar = () => {

const [state , setState] = useState('');


const dispatch = useDispatch()

  const fnState = (event) => {
    setState(event.target.value)
  }


  const limpiarState = () => {
    dispatch(searchXname(state))
    setState('')
  }

    return(
        <div className={style.divInput}>
        <input type='text' placeholder='busca tu video juego...' onChange={fnState} value={state} className={style.input}></input>
         <button type="submit" onClick={limpiarState} className={style.button}>buscar</button>
        </div>
    )
}

export default SearchBar