import React, { useEffect, useState } from 'react';
import style from './modifCateg.module.css'
import { getCategorys, postCategory, deleteCategory } from '../../redux/actions/actions';
import Navbar2 from '../navbar/navBar2'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const validate = (input, categs) => {
    let errors = {};
    if (input.nombre) {
        if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.nombre)) {
            errors.nombre =
                "Este dato es incorrecto... No se permiten caracteres especiales o números.";
        }
        /* if (
            categs.some((e) => e.toUpperCase() === input.toUpperCase())
          ) {
            errors.nombre = "Este producto ya existe!";
          } */
    }
    return errors;
};

export default function ModifCateg() {
    const dispatch = useDispatch()
    const categs = useSelector((state) => state.categorys);
    const history = useHistory();

    const [input, setInput] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getCategorys());
    }, [dispatch]);


    const handlerChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validate(
                {
                    ...input,
                    [e.target.name]: e.target.value,
                },
                categs
            )
        );
    };

    const handleDelete = (e) => {
        dispatch(deleteCategory(e.target.value));
        console.log(e.target.value);
        /* history.push("/modifCateg"); */
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(postCategory(input));
        setTimeout(() => dispatch(getCategorys()), 100);
        setInput("");
        history.push("/modifCateg");
    };

    return (
        <div>
            {console.log(categs)}
            <Navbar2 />
            <div className={style.modifCategCont}>
                <h1>Categorías</h1>
                <form onSubmit={(e) => handlerSubmit(e)}>
                    <div className={style.inputI}>
                        <label>Nombre de la nueva categoría: </label>
                        <input
                            type="text"
                            name="nombre"
                            value={input.nombre}
                            onChange={(e) => handlerChange(e)}
                        ></input>
                        {errors.nombre && <p className={style.errors}>{errors.nombre}</p>}
                    </div>
                    <div className={style.publicar}>
                        <button>
                            Crear Categoría
                        </button>
                    </div>
                </form>

                <div className={style.categs}>
                    {categs.map(categ => //mapeo mi estado local con todas las categs
                        <div key={categs.indexOf(categ)} className={style.categ}>
                            <p >{categ}</p>
                            <button
                                value={categ}
                                onClick={(e) => handleDelete(e)}
                                className={style.x}>
                                Borrar
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}