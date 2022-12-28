import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import s from './Answers.module.css';
import back from '../../img/back.png';
import usuario from '../../img/user.svg';
import { useAuth0 } from '@auth0/auth0-react';
import AdminQA from '../adminQA/AdminQA';

export default function Answers() {

    const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0()

    return (
        <div>
            <div className={s.detailHeader}>
                <div className={s.black}></div>
                <div className={s.white}>
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <div className={s.backHome}>
                            <img src={back} alt=""></img>
                            Inicio
                        </div>
                    </NavLink>
                    <div className={s.btns}>
                        {isAuthenticated ? (
                            <div className={s.profileMenu}>
                                <details>
                                    <summary>Hola {user.nickname}!</summary>
                                    <div className={s.desplegable}>
                                        <div>
                                            <Link to="/profile" style={{ textDecoration: 'none' }} className={s.button}>Perfil</Link>
                                        </div>
                                        <div>
                                            <button onClick={() => logout()} className={s.button}>Cerrar sesión</button>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        ) : (
                            <button onClick={() => loginWithRedirect()} className={s.btn}> <img src={usuario} alt=""></img> </button>
                        )}
                    </div>
                </div>
            </div>
            <div className={s.answerCont}>
                <AdminQA></AdminQA>
            </div>
        </div>
    );
}