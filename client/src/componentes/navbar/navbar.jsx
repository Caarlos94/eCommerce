import React from "react";
import SearchBar from "./searchBar/searchBar.jsx";
import Filtros from "./filtros/filtros.jsx";
import style from './navbar.module.css';
import { NavLink } from "react-router-dom";


// import { Link } from "react-router-dom";



const Navbar = () => {

    return (
       <div className={style.div}>
         <SearchBar/>

         <Filtros/>
        
        <NavLink to='/product'>
          <button>Publicar un producto!</button>
        </NavLink>

       </div>
     );
}

export default Navbar


