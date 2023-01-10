import { NavLink } from 'react-router-dom';
import style from './Footer.module.css';
import github from '../../img/github.png';

export default function Footer() {
  return (
    <div className={style.div}>
      <h2>SupraSports</h2>
      <div className={style.links}>
        <NavLink to="/about" style={{ textDecoration: 'none' }}>
          <h4>Nosotros</h4>
        </NavLink>

        <div className={style.redes}>
          <h4>Redes: </h4>
          <a href="https://github.com/Caarlos94/eCommerce" target="_blank" rel="noreferrer">
            <img src={github} alt="github" />
          </a>
        </div>

      </div>
    </div>
  );
}
