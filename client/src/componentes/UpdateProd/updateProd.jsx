import style from './updateProd.module.css'
import Navbar2 from '../navbar/navBar2'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { getCategorys, getProducts, getProducts2, updateProduct } from '../../redux/actions/actions';

const validate = (input, prods) => {
    let errors = {};
    if (input.nombre) {
        if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.nombre)) {
            errors.nombre =
                "Este dato es incorrecto... Es obligatorio, no se permiten caracteres especiales o números.";
        }
        if (prods.some((e) => e.nombre.toUpperCase() === input.nombre.toUpperCase())) {
            errors.nombre = "Este producto ya existe!";
        }
    }
    if (input.URL) {
        if (!/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.URL)) {
            errors.URL =
                "Este dato es obligatorio, solo permite imágenes de tipo .jpg/.png/.jpeg";
        }
    }
    if (input.precio) {
        if (input.precio < 1) {
            errors.precio =
                "Este dato es obligatorio, solo permite números mayores a uno.";
        }
    }
    if (input.color) {
        if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.color)) {
            errors.color =
                "Este dato es obligatorio, no se permiten caracteres especiales, números o espacios.";
        }
    }
    if (input.talla) {
        if (!/^[A-Za-z0-9\s]+$/.test(input.talla)) {
            errors.talla =
                "Este dato es obligatorio, no se permiten caracteres especiales.";
        }
    }
    if (input.marca) {
        if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.marca)) {
            errors.marca =
                "Este dato es obligatorio, no se permiten caracteres especiales o números.";
        }
    }
    if (input.stock) {
        if (input.stock < 0 || !/^[0-9]+$/.test(input.stock)) {
            errors.stock =
                "Este dato es obligatorio, solo permite números entero y mayor o igual 0.";
        }
    }
    return errors;
};

export default function UpdateProd() {
    const dispatch = useDispatch();
    const prods = useSelector((state) => state.products);

    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        nombre: "",
        URL: "",
        precio: "",
        color: "",
        talla: "",
        marca: "",
        stock: "",
    });

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategorys())
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
                prods
            )
        );
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(updateProduct(input));
        setTimeout(() => dispatch(getProducts2()), 100);
        alert("Producto actualizado con éxito! Se te redirigirá al inicio...");
        setInput({
            nombre: "",
            URL: "",
            precio: "",
            color: "",
            talla: "",
            marca: "",
            stock: "",
        });
        history.push("/");
    };



    return (
        <div>
            {console.log(prods.some((e) => e))}
            <Navbar2 />
            <div className={style.content}>
                <h1>Editor de Productos</h1>
                <div className={style.forms}>
                    <form onSubmit={(e) => handlerSubmit(e)}>
                        <div className={style.inputI}>
                            <label>Nombre: </label>
                            <input
                                type="text"
                                name="nombre"
                                value={input.nombre}
                                onChange={(e) => handlerChange(e)}
                            ></input>
                            {errors.nombre && <p className={style.errors}>{errors.nombre}</p>}
                        </div>

                        <div className={style.inputI}>
                            <label>Imagen: </label>
                            <input
                                type="text"
                                value={input.URL}
                                name="URL"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                            {errors.URL
                                ? <p className={style.errors}>{errors.URL}</p>
                                : input.URL
                                    ? <img src={input.URL} alt='img'></img>
                                    : ""
                            }
                        </div>

                        <div className={style.inputI}>
                            <label>Precio </label>
                            <input
                                type="number"
                                value={input.precio}
                                name="precio"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                            {errors.precio && <p className={style.errors}>{errors.precio}</p>}
                        </div>

                        <div className={style.inputI}>
                            <label>Color: </label>
                            <input
                                type="text"
                                value={input.color}
                                name="color"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                            {errors.color && <p className={style.errors}>{errors.color}</p>}
                        </div>

                        <div className={style.inputI}>
                            <label>Talla: </label>
                            <input
                                type="text"
                                value={input.talla}
                                name="talla"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                            {errors.talla && <p className={style.errors}>{errors.talla}</p>}
                        </div>

                        <div className={style.inputI}>
                            <label>Marca: </label>
                            <input
                                type="text"
                                value={input.marca}
                                name="marca"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                            {errors.marca && <p className={style.errors}>{errors.marca}</p>}
                        </div>

                        <div className={style.inputI}>
                            <label>Stock: </label>
                            <input
                                type="number"
                                value={input.stock}
                                name="stock"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                            {errors.stock && <p className={style.errors}>{errors.stock}</p>}
                        </div>

                        <div className={style.publicar}>
                            <button type="submit">
                                Publicar Producto!
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <Footer />
        </div>
    )
}