import React from 'react';
import style from './searcBar.module.css';
import { useState } from 'react';
import { searchXname } from '../../../redux/actions/actions.js';
import { useDispatch } from 'react-redux';
import img from '../../../img/lupa.png';

const SearchBar = ({ setPages }) => {
  const [state, setState] = useState('');

  const dispatch = useDispatch();

  const fnState = (event) => {
    setState(event.target.value);
  };

  const limpiarState = () => {
    dispatch(searchXname(state));
    setPages(1);
    setState('');
  };

  return (
    <div className={style.divInput}>
      <input
        type="text"
        placeholder="Buscar productos..."
        onChange={fnState}
        value={state}
        className={style.input}
      ></input>
      <button type="submit" onClick={limpiarState} className={style.button}>
        <img className={style.lupa} alt="" src={img}></img>
      </button>
    </div>
  );
};

export default SearchBar;
