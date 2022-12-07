import React from "react";
import style from './searcBar.module.css'
import { useState } from "react";
import { Link } from "react-router-dom";


const SearchBar = () => {

const [state , setState] = useState('');

  const fnState = (event) => {
    setState(event.target.value)
  }


  const limpiarState = () => {
    setState('')
  }

    return(
        <div className={style.divInput}>
        <input type='text' placeholder='busca tu video juego...' onChange={fnState} value={state} className={style.input}></input>
         <Link to={`/filtrados/${state}`}>
         <button type="submit" onClick={limpiarState} className={style.button}>buscar</button>
        </Link>
        </div>
    )
}

export default SearchBar