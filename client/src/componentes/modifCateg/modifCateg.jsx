import React, { useEffect } from 'react';
import style from './modifCateg.module.css'
import { getCategorys } from '../../redux/actions/actions';
import Navbar2 from '../navbar/navBar2'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';


export default function ModifCateg() {
    const dispatch = useDispatch()
    const categs = useSelector((state) => state.categorys);

    useEffect(() => {
        dispatch(getCategorys());
    }, [dispatch]);

    return (
        <div>
            {console.log(categs)}
            <Navbar2 />
            <div className={style.modifCategCont}>
                <h1>Categorías</h1>

                <div className={style.categs}>
                    {categs.map(categ => //mapeo mi estado local con todas las categs
                        <div key={categs.indexOf(categ)} className={style.categ}>
                            <p >{categ}</p>
                            <button /* onClick={() => handleDelete(categ)} */ className={style.x}>Borrar</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}