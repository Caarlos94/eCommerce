import style from './About.module.css'
import Navbar2 from '../navbar/navBar2'
import Footer from '../Footer/Footer'


export default function About() {
    return (
        <div>
            <Navbar2 />
            <div className={style.contentAbout}>
                <h1>Nosotros</h1>

                <h3>SupraSports es una página dedicada a la venta de indumentaria deportiva.</h3>
                <h5>Diseñada por:</h5>
                <h6>
                    Carlos-Islas<br />
                    Alejandro Mocse<br />
                    Joaquín Di Leo<br />
                    Carlos Medero<br />
                    Cesar Zegarra<br />
                    Belisandro Dávalos<br />
                </h6>
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
            </div>
            <Footer />
        </div>
    )
}