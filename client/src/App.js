import "./App.css";
import ProductCreate from "./componentes/ProductCreate/ProductCreate";
import Home from "./componentes/home/home.jsx";
import Details from "./componentes/details/details";
import Perfil from "./componentes/navbar/Perfil/Perfil";
import Carrito from "./componentes/Carrito/Carrito";
import Answers from "./componentes/Answers/Answers";
import VentasAdmin from "./componentes/VentasAdmin/VentasAdmin";
import Favorites from "./componentes/Favorites/Favorites";
import HistorialUsuario from "./componentes/HistorialUsuario/HistorialUsuario";
import { Route } from "react-router-dom";
import About from "./componentes/About/About";
import modifCateg from "./componentes/modifCateg/modifCateg";
import { ProtectedRoute } from "./componentes/ProtectedRoute";
import Prueba from "./componentes/historialCompras/historialUsuario.jsx";
import ReviewForm from "./componentes/ReviewForm/ReviewForm";
import SuperAdmin from './componentes/superAdmin/superAdmin.jsx'
function App() {
  return (
    <div className="divPadre">
      <Route exact path="/" component={Home} />
      {/* <Route path="/updateProd/:id" component={UpdateProd} />
      <Route path="/compras/review/:id" component={Review} /> */}
      <Route path="/details/:id" component={Details} />
      <Route path="/cart" component={Carrito} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={Perfil} />
      {/* <Route path="/formCompra" component={FormCompra} /> */}
      <Route exact path="/favorites" component={Favorites} />
      <ProtectedRoute path="/product" component={ProductCreate} />
      <ProtectedRoute path="/answers" component={Answers} />
      <ProtectedRoute path="/modifCateg" component={modifCateg} />
      <ProtectedRoute path="/sales" component={VentasAdmin} />
      <ProtectedRoute path="/historial" component={Prueba} />
      <ProtectedRoute path="/review-form" component={ReviewForm} />
      <ProtectedRoute path="/superAdmin" component={SuperAdmin} />
    </div>
  );
}

export default App;
