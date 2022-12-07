import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import Categoria from "../../../../server/src/models/Categoria";
import { postDog, getTemperaments, getDogs } from "../../actions";
import style from "./DogCreate.module.css"

export default function ProdCreate() {
    const dispatch = useDispatch();
    const prods = useSelector(state => state.products)

    const history = useHistory();
    const [errors, setErrors] = useState()
    const [input, setInput] = useState({
        nombre: '',
        URL: '',
        precio: '',
        color: '',
        talla: '',
        marca: '',
        Categoria: ''
    })

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const handlerChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handlerSelectCateg = (e) => {
        if (!input.Categoria.includes(e.target.value)) {
            setInput({
                ...input,
                Categoria: [...input.Categoria, e.target.value]
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
            Categoria: ''
        })
        history.push('/home')//me manda al home
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            Categoria: input.Categoria.filter(categ => categ !== e)//deja todo lo que no sea el elemento clickeado apra eliminar
        })
    }


    return (
        <div>
            <div>
                <h1>Crear Producto</h1>
                <form onSubmit={(e) => handlerSubmit(e)}>
                    <div>
                        <label>Nombre: </label>
                        <input type='text' name='name' value={input.nombre} onChange={(e) => handlerChange(e)} >
                        </input>
                    </div>

                    <div>
                        <label>URL de Imagen: </label>
                        <input type='text' value={input.URL} name='url' onChange={(e) => handlerChange(e)}></input>
                    </div>

                    <div>
                        <label>Precio </label>
                        <input type='number' value={input.precio} name='precio' onChange={(e) => handlerChange(e)}></input>
                    </div>

                    <div>
                        <label>Color: </label>
                        <input type='text' value={input.color} name='color' onChange={(e) => handlerChange(e)}></input>
                    </div>

                    <div>
                        <label>Talla: </label>
                        <input type='text' value={input.talla} name='talla' onChange={(e) => handlerChange(e)}></input>
                    </div>

                    <div>
                        <label>Marca: </label>
                        <input type='text' value={input.marca} name='marca' onChange={(e) => handlerChange(e)}></input>
                    </div>

                    <select onChange={(e) => handlerSelectCateg(e)}>
                        {Categoria.map(categ => (
                            <option value={categ.name} key={categ.id}>{categ.name}</option>
                        ))}
                    </select>

                    <div>
                        <button type="create" >Publicar Producto!</button>
                    </div>
                </form>

                <div>
                    {input.Categoria.map(categ =>
                        <div key={categ}>
                            <p >{categ}</p>
                            <button onClick={() => handleDelete(categ)}>x</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}