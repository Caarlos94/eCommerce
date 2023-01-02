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
                    <>Redes: </> 
                    <img src={instagram} alt="" />
                </NavLink>

                {/* <div className={style.contacto}>
                    <h6>suprasportspf@gmail.com</h6>
                    <h6>+54 3516853857</h6>
                </div> */}
            </div>
        </div>
    )
}