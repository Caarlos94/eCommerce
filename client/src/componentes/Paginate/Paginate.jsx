import React from 'react'
import style from './Paginate.module.css'

export default function Paginado({ productsPerPage, allProducts, paginado, page}){
    const pageNumbers = []

    for (let i = 0 ; i < Math.ceil(allProducts/productsPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className={style.pagination}>
                {
                    pageNumbers && pageNumbers.map( number => (
                        <li key={number} style={{ listStyle:'none' }}>
                            <button className={style.buttons} style={ page === number ? {color:"white", background:'darkgrey'} : {}}onClick={() => paginado(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )

}
