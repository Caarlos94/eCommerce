import { NavLink } from 'react-router-dom';
import style from './Footer.module.css';
import github from '../../img/github.png';

export default function Footer() {
  return (
    <div className={style.div}>
      <div className={style.contenedor}>
    
      <div className={style.links}>
    
    <div className={style.divLink}>
        <NavLink to="/about" style={{ textDecoration: 'none' }}>
          <h4 className={style.nosotros}>Nosotros</h4>
        </NavLink>
    </div>

    <div className={style.divLink}>
        <div className={style.redes}>
          <a href="https://github.com/Caarlos94/eCommerce" target="_blank" rel="noreferrer">
            <img src={github} alt="github" className={style.img}/>
          </a>
        </div>
    </div>

    <div className={style.divLink}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <h2 className={style.h2}>SupraSports</h2>
        </NavLink>
    </div>
      </div>
    </div>

    <h5 className={style.copyrigth}>©2023~ – Todos los derechos reservados</h5>
    </div>
  );
}
