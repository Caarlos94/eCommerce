import { NavLink } from 'react-router-dom';
import style from './Footer.module.css';
import instagram from '../../img/insta.png'


export default function Footer() {
    return (
        <div className={style.div}>
            <h2>SupraSports</h2>
            <div className={style.links}>
                <NavLink to='/about' style={{ textDecoration: 'none' }}>
                    <h4>Nosotros</h4>
                </NavLink>

                <NavLink to='/' style={{ textDecoration: 'none' }}>
                    <img src={instagram} alt="" />
                </NavLink>

                <NavLink to='/contact' style={{ textDecoration: 'none' }}>
                    <h4>Contacto</h4>
                </NavLink>
            </div>
        </div>
    )
}