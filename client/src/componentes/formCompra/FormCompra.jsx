import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar2 from '../navbar/navBar2';
import style from './FormCompra.module.css';
import { updateClient } from '../../redux/actions/actions.js';
import { useAuth0 } from '@auth0/auth0-react';
import { useValidateUser } from '../../customHooks/validate-user';

export default function FormCompra({ handle }) {

    // const [ isAuthenticated, isAdmin, accessToken, userId ] =  useValidateUser()

    const { user } = useAuth0();
    console.log(user.email);

    // console.log(userId);

    const dispatch = useDispatch();

    // const history = useHistory();
    const [input, setInput] = useState({
        ciudad: "",
        cp: "",
        direc: "",
        cel: "",
    });

    // const { user } = useAuth0();

    const handlerChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        // console.log(userId);
        // dispatch(updateClient(input));
        alert("Datos de envío guardados con éxito! Estás listo para la instancia de pago.");
        setInput({
            ciudad: "",
            cp: "",
            direc: "",
            cel: "",
        }); 
    };

    return (
        <div>
            <div className={style.cont}>
                <h1>Formulario de Envío</h1>

                <div className={style.forms}>
                    <form onSubmit={(e) => handlerSubmit(e)}>
                        <div className={style.inputI}>
                            <label>Ciudad: </label>
                            <input
                                type="text"
                                value={input.ciudad}
                                name="ciudad"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                        </div>

                        <div className={style.inputI}>
                            <label>Código Postal </label>
                            <input
                                type="number"
                                value={input.cp}
                                name="cp"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                        </div>

                        <div className={style.inputI}>
                            <label>Dirección: </label>
                            <input
                                type="text"
                                value={input.direc}
                                name="direc"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                        </div>

                        <div className={style.inputI}>
                            <label>Celular de contacto: </label>
                            <input
                                type="number"
                                value={input.cel}
                                name="cel"
                                onChange={(e) => handlerChange(e)}
                            ></input>
                        </div>

                        <div className={style.publicar}>
                            <button onClick={()=> handle( input, user.email )} type="submit">
                                Guardar datos para envío...
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}