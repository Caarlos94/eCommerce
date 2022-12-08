import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getCategorys, getProducts, postProd } from "../../redux/actions/actions";


const validate = (input, prods) => {
    let errors = {};
    if (!(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/).test(input.nombre)) {
        errors.nombre = 'Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales o números.'
    }
    if (input.precio < 1) {
        errors.precio = 'Este dato es obligatorio, solo permite números positivos.'
    }
    if (prods.some(e => e.nombre.toUpperCase() === input.nombre.toUpperCase())) {
        errors.nombre = 'Este producto ya existe!' 
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

    const history = useHistory();
    const [errors, setErrors] = useState({
        nombre: '',
        URL: '',
        precio: '',
        color: '',
        talla: '',
        marca: '',
        categoria: ''
    })
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
        /* dispatch(getCategorys()); */
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

    const handlerCheck = (e) => {
        if (e.target.checked) {// si el input está check(si está marcado)
            setInput({ //setea el estado con el e.target.value
                ...input,
                categoria: e.target.value,
            })
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        dispatch(postProd(input))
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
        history.push('/home')//me manda al home
    }


    return (
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <div>
                <h1>Crear Producto</h1>
                <form onSubmit={(e) => handlerSubmit(e)}>
                    <div>
                        <label>Nombre: </label>
                        <input type='text' name='nombre' value={input.nombre} onChange={(e) => handlerChange(e)} ></input>
                        {errors.nombre && (<p>{errors.nombre}</p>)}
                    </div>

                    <div>
                        <label>Imagen: </label>
                        <input type='text' value={input.URL} name='URL' onChange={(e) => handlerChange(e)} disabled={!input.nombre || errors.nombre}></input>
                    </div>

                    <div>
                        <label>Precio </label>
                        <input type='number' value={input.precio} name='precio' onChange={(e) => handlerChange(e)} disabled={!input.URL || errors.URL}></input>
                        {errors.precio && input.URL && (<p>{errors.precio}</p>)}
                    </div>

                    <div>
                        <label>Color: </label>
                        <input type='text' value={input.color} name='color' onChange={(e) => handlerChange(e)} disabled={!input.precio || errors.precio}></input>
                        {errors.color && !errors.precio && (<p>{errors.color}</p>)}
                    </div>

                    <div>
                        <label>Talla: </label>
                        <input type='text' value={input.talla} name='talla' onChange={(e) => handlerChange(e)} disabled={!input.color || errors.color}></input>
                        {errors.talla && !errors.color && (<p>{errors.talla}</p>)}
                    </div>

                    <div>
                        <label>Marca: </label>
                        <input type='text' value={input.marca} name='marca' onChange={(e) => handlerChange(e)} disabled={!input.talla || errors.talla}></input>
                        {errors.marca && !errors.talla && (<p>{errors.marca}</p>)}
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <label><input type="checkbox" name="Camperas" value="Camperas" onChange={(e) => handlerCheck(e)} />Campera</label>
                        <label><input type="checkbox" name="Remeras" value="Remeras" onChange={(e) => handlerCheck(e)} />Remera</label>
                        <label><input type="checkbox" name="Shorts" value="Shorts" onChange={(e) => handlerCheck(e)} />Short</label>
                        <label><input type="checkbox" name="Zapatillas" value="Zapatillas" onChange={(e) => handlerCheck(e)} />Zapatillas</label>
                        <label><input type="checkbox" name="Pantalones" value="Pantalones" onChange={(e) => handlerCheck(e)} />Pantalón</label>
                    </div>

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