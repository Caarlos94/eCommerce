import React from "react";
import SearchBar from "./searchBar/searchBar.jsx";
import Filtros from "./filtros/filtros.jsx";
import style from './navbar.module.css';



// import { Link } from "react-router-dom";



const Navbar = () => {

    return (
       <div className={style.div}>
         <SearchBar/>

         <Filtros/>
        
       </div>
     );
}

export default Navbar


