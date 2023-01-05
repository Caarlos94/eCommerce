import "./App.css";
import ProductCreate from "./componentes/ProductCreate/ProductCreate";
import Home from "./componentes/home/home.jsx";
import Details from "./componentes/details/details";
import Perfil from "./componentes/navbar/Perfil/Perfil";
import Carrito from "./componentes/Carrito/Carrito";
import Answers from "./componentes/Answers/Answers";
import VentasAdmin from "./componentes/VentasAdmin/VentasAdmin";
import Favorites from "./componentes/Favorites/Favorites";
import { Route } from "react-router-dom";
import About from "./componentes/About/About";
import modifCateg from './componentes/modifCateg/modifCateg';
import { ProtectedRoute } from "./componentes/ProtectedRoute";
import UpdateProd from './componentes/UpdateProd/updateProd';
import Prueba from "./componentes/historialCompras/historialUsuario.jsx";
import ReviewForm from "./componentes/ReviewForm/ReviewForm";
import FormCompra from "./componentes/formCompra/FormCompra";

function App() {
  return (
    <div className="divPadre">
      <Route exact path="/" component={Home} />
      <Route path="/updateProd/:id" component={UpdateProd} />
      <Route path="/details/:id" component={Details} />
      <Route path="/cart" component={Carrito} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={Perfil} />
      <Route path="/formCompra" component={FormCompra} />
      <Route exact path="/favorites" component={Favorites} />
      <ProtectedRoute path="/answers" component={Answers} />
      <ProtectedRoute path="/modifCateg" component={modifCateg} />
      <ProtectedRoute path="/sales" component={VentasAdmin} />
      <ProtectedRoute path="/historial" component={Prueba} />
      <ProtectedRoute path="/review-form" component={ReviewForm} />
      <ProtectedRoute path="/product" component={ProductCreate} />
    </div>
  );
}

export default App;
