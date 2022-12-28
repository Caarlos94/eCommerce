import { NavLink } from "react-router-dom";
import style from './About.module.css'
import logo from '../../img/SupraLogo.jpg';
import back from '../../img/back.png';

export default function About() {


    return (
        <div>
            <div className={style.createHeader}>
                <div className={style.black}></div>
                <div className={style.white}>
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <div className={style.backHome}>
                            <img src={back} alt=""></img>
                            Inicio
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className={style.cont}>
                <div>
                    <img src={logo} alt="" />
                </div>
            </div>

        </div>
    )
}