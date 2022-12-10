import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getCategorys, getProducts, postProd } from "../../redux/actions/actions";
import style from './ProductCreate.module.css'


const validate = (input, prods) => {
    let errors = {};
    if (!(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/).test(input.nombre)) {
        errors.nombre = 'Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales o números.'
    }
    if (prods.some(e => e.nombre.toUpperCase() === input.nombre.toUpperCase())) {
        errors.nombre = 'Este producto ya existe!'
    }
    if (!(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i).test(input.URL)) {
        errors.URL = 'Este dato es obligatorio, solo permite imágenes de tipo .jpg/.png/.jpeg'
    }
    if (input.precio < 1) {
        errors.precio = 'Este dato es obligatorio, solo permite números mayores a uno.'
    }
    if (!(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/).test(input.color)) {
        errors.color = 'Este dato es obligatorio, no se permiten caracteres especiales, números o espacios.'
    }
    if (!(/^[A-Za-z0-9\s]+$/).test(input.talla)) {
        errors.talla = 'Este dato es obligatorio, no se permiten caracteres especiales.'
    }
    if (!(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/).test(input.marca)) {
        errors.marca = 'Este dato es obligatorio, no se permiten caracteres especiales o números.'
    }

    return errors;
}

export default function ProdCreate() {
    const dispatch = useDispatch();
    const prods = useSelector(state => state.products)
    const categs = useSelector(state => state.categorys)

    const history = useHistory();
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        nombre: '',
        URL: '',
        precio: '',
        color: '',
        talla: '',
        marca: '',
        categoria: ''
    })

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategorys());
    }, [dispatch])

    const handlerChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }, prods
        ))
    }

    const handlerSelectCateg = (e) => {
        if (!input.categoria.includes(e.target.value)) {
            setInput({
                ...input,
                categoria: e.target.value
            })
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(postProd(input));
        alert('Producto publicado con éxito! Se te redirigirá al inicio...')
        setInput({
            nombre: '',
            URL: '',
            precio: '',
            color: '',
            talla: '',
            marca: '',
            categoria: ''
        })
        history.push('/')//me manda al home
    }

    return (
        <div>
            <Link to='/'>
                <button>Volver</button>
            </Link>
            <div>
                <h1>Crear Producto</h1>
                <form onSubmit={(e) => handlerSubmit(e)}>

                    <div className={style.inputs}>
                        <label>Nombre: </label>
                        <input type='text' name='nombre' value={input.nombre} onChange={(e) => handlerChange(e)} ></input>
                        {errors.nombre && (<p className={style.errors}>{errors.nombre}</p>)}
                    </div>

                    <div>
                        <label>Imagen: </label>
                        <input type='text' value={input.URL} name='URL' onChange={(e) => handlerChange(e)}
                            disabled={!input.nombre || errors.nombre}></input>

                        {errors.URL && !errors.nombre && (<p className={style.errors}>{errors.URL}</p>)}
                    </div>

                    <div>
                        <label>Precio </label>
                        <input type='number' value={input.precio} name='precio' onChange={(e) => handlerChange(e)}
                            disabled={!input.nombre || !input.URL || errors.URL}></input>

                        {errors.precio && !errors.URL && (<p className={style.errors}>{errors.precio}</p>)}
                    </div>

                    <div>
                        <label>Color: </label>
                        <input type='text' value={input.color} name='color' onChange={(e) => handlerChange(e)}
                            disabled={!input.nombre || !input.URL || !input.precio || errors.precio}></input>

                        {errors.color && !errors.precio && (<p className={style.errors}>{errors.color}</p>)}
                    </div>

                    <div>
                        <label>Talla: </label>
                        <input type='text' value={input.talla} name='talla' onChange={(e) => handlerChange(e)}
                            disabled={!input.nombre || !input.URL || !input.precio || !input.color || errors.color}></input>

                        {errors.talla && !errors.color && (<p className={style.errors}>{errors.talla}</p>)}
                    </div>

                    <div>
                        <label>Marca: </label>
                        <input type='text' value={input.marca} name='marca' onChange={(e) => handlerChange(e)}
                            disabled={!input.nombre || !input.URL || !input.precio || !input.color || !input.talla || errors.talla}></input>

                        {errors.marca && !errors.talla && (<p className={style.errors}>{errors.marca}</p>)}
                    </div>

                    <label>Categoría: </label>
                    <select onChange={(e) => handlerSelectCateg(e)}>
                        {categs.map(c => (
                            <option value={c} key={categs.indexOf(c)}>{c}</option>
                        ))}
                    </select>

                    <div>
                        <button type="submit" disabled={!input.nombre || errors.nombre || errors.precio || errors.color || errors.talla || errors.marca || !input.categoria}>
                            Publicar Producto!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}