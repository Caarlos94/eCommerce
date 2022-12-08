import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/actions.js'
import Card from '../Card/Card'
import Paginate from '../Paginate/Paginate'
import { Link } from 'react-router-dom';


const Home = () => {

    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const indexOfLastProducts = currentPage * productsPerPage;
    const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProducts, indexOfLastProducts)
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
  }


useEffect(()=>{
dispatch(getProducts())
},[])

useEffect(() => {
  setCurrentPage(1);
}, [allProducts.length,setCurrentPage]);


    return (
      <div>
          <Paginate
                productsPerPage={productsPerPage}
                allProduts = {allProducts.length}
                paginado={paginado}
                page={currentPage}
            />
            <div>
            {
                currentProducts.length ? 
                typeof currentProducts[0] === 'object' ?
                currentProducts.map( el => {
                    return(
                        <div>
                            <Card name={el.name} types={el.branch} image={el.image} id={el.id} price={el.price} />
                        </div>
                    )
                }) :
                <div >
                    <span>{currentProducts[0]} not found</span>
                </div>
                :
                <div> 
                    <p>Loading...</p>
                </div>
            }
            </div>
      </div>
    )

}



export default Home