import style from './About.module.css'
import Navbar2 from '../navbar/navBar2'
import Footer from '../Footer/Footer'


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
      <p  className={style.text_body} ></p>
    </div>
   </div>

    <div className={style.card}>
     <div className={style.card_image2}></div>
     <div className={style.card_description}>
      <p className={style.text_title}>Alejandro mocse</p>
      <p  className={style.text_body} ></p>
    </div>
   </div>

   <div className={style.card}>
     <div className={style.card_image3}></div>
     <div className={style.card_description}>
      <p className={style.text_title}>Carlos Medero</p>
      <p  className={style.text_body} ></p>
     </div>
   </div>

   <div className={style.card}>
     <div className={style.card_image4}></div>
     <div className={style.card_description}>
      <p className={style.text_title}>Joaquin Di Leo</p>
      <p  className={style.text_body} ></p>
     </div>
   </div>

   <div className={style.card}>
     <div className={style.card_image5}></div>
     <div className={style.card_description}>
      <p className={style.text_title}>Cesar Zegarra </p>
      <p  className={style.text_body}></p>
     </div>
   </div>

   <div className={style.card}>
     <div className={style.card_image6}></div>
     <div className={style.card_description}>
      <p className={style.text_title}>belisario Davalos </p>
      <p  className={style.text_body} ></p>
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