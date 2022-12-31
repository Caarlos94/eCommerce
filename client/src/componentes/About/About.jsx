import style from './About.module.css'
import Navbar2 from '../navbar/navBar2'
import Footer from '../Footer/Footer'


export default function About() {
    return (
        <div>
            <Navbar2 />
            <div className={style.contentAbout}></div>
            <Footer />
        </div>
    )
}