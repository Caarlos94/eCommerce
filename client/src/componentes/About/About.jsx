import style from './About.module.css'
import Navbar2 from '../navbar/navBar2'
import Footer from '../Footer/Footer'
import gitHub from './assets/github.png'
import linkedIn from './assets/linkedIn.png'
/* import DiLeoCV from './assets/DiLeo_CV.pdf' */


export default function About() {
  return (
    <div className={style.Div}>

      <Navbar2 />

      <div className={style.contentAbout}>
        <h1>Nosotros</h1>

        <div className={style.divPadre}>

          <div className={style.card}>
            <div className={style.card_image}>
            </div>
            <div className={style.card_description}>
              <p className={style.text_title}>Carlos islas</p>
              <p className={style.text_body} >
                <div className={style.contacto}>
                  <a href="https://github.com/Caarlos94" target="_blank" rel="noreferrer">
                    <img src={gitHub} alt="github" />
                  </a>
                  <a href='https://www.linkedin.com/mwlite/in/juan-carlos-islas-lopez' target="_blank" rel="noreferrer">
                    <img src={linkedIn} alt="cv" />
                  </a>
                </div>
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.card_image2}></div>
            <div className={style.card_description}>
              <p className={style.text_title}>Alejandro mocse</p>
              <p className={style.text_body} >
                <div className={style.contacto}>
                  <a href="https://github.com/alej-mocse1" target="_blank" rel="noreferrer">
                    <img src={gitHub} alt="github" />
                  </a>
                  <a href='https://www.linkedin.com/in/alejandro-mocse-1329b8251/' target="_blank" rel="noreferrer">
                    <img src={linkedIn} alt="cv" />
                  </a>
                </div>
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.card_image3}></div>
            <div className={style.card_description}>
              <p className={style.text_title}>Carlos Medero</p>
              <p className={style.text_body} >
                <div className={style.contacto}>
                  <a href="https://github.com/mederocc" target="_blank" rel="noreferrer">
                    <img src={gitHub} alt="github" />
                  </a>
                  <a href='https://www.linkedin.com/in/carlos-medero-546239107' target="_blank" rel="noreferrer">
                    <img src={linkedIn} alt="cv" />
                  </a>
                </div>
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.card_image4}></div>
            <div className={style.card_description}>
              <div className={style.title}>
                <p className={style.text_title}>Joaquin Di Leo</p>
              </div>
              <p className={style.text_body} >
                <div className={style.contacto}>
                  <a href="https://github.com/dileo24" target="_blank" rel="noreferrer">
                    <img src={gitHub} alt="github" />
                  </a>
                  <a href='https://www.linkedin.com/in/joaquindileo/' target="_blank" rel="noreferrer">
                    <img src={linkedIn} alt="cv" />
                  </a>
                </div>
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.card_image5}></div>
            <div className={style.card_description}>
              <p className={style.text_title}>Cesar Zegarra </p>
              <p className={style.text_body}>
                <div className={style.contacto}>
                  <a href="https://github.com/cesarzv" target="_blank" rel="noreferrer">
                    <img src={gitHub} alt="github" />
                  </a>
                  <a href='https://www.linkedin.com/in/cesar-zegarra-b55061255/' target="_blank" rel="noreferrer">
                    <img src={linkedIn} alt="cv" />
                  </a>
                </div>
              </p>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.card_image6}></div>
            <div className={style.card_description}>
              <p className={style.text_title}>Belisario Davalos </p>
              <p className={style.text_body} >
                <div className={style.contacto}>
                  <a href="https://github.com/belidavalos11" target="_blank" rel="noreferrer">
                    <img src={gitHub} alt="github" />
                  </a>
                  <a href='https://www.linkedin.com/in/belisario-davalos-704827192/' target="_blank" rel="noreferrer">
                    <img src={linkedIn} alt="cv" />
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>

        <div className={style.divData}>
          <h3>SupraSports es una página dedicada a la venta de indumentaria deportiva.</h3>

          <h5>Esta cuenta con:</h5>
          <h6>
            Diseño responsive.<br />
            Filtrados varios.<br />
            Ordenamiento por precio.<br />
            Creación de productos nuevos.<br />
            Creación/eliminción de categorías.<br />
            Barra de búsqueda.<br />
            Preguntas y respuestas.<br />
            Registro de ventas con ordenamientos propios.<br />
            Sistema de login con correo y contraseña. <br />
            Sistema de login con google. <br />
            Favoritos.<br />
            Carrito de compra.<br />
            MercadoPago.<br />
            Detalles de cada producto.<br />
            Paginado.<br />
            Perfil de usuario.<br />
          </h6>


          <div className={style.Footer}>
            <Footer />
          </div>
        </div>
      </div>



    </div>
  )
}