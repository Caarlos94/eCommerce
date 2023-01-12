import "./App.css";
import ProductCreate from "./componentes/ProductCreate/ProductCreate";
import Home from "./componentes/home/home.jsx";
import Details from "./componentes/details/details";
import Perfil from "./componentes/navbar/Perfil/Perfil";
import Carrito from "./componentes/Carrito/Carrito";
import Answers from "./componentes/Answers/Answers";
import VentasAdmin from "./componentes/VentasAdmin/VentasAdmin";
import Favorites from "./componentes/Favorites/Favorites";
import ReviewForm from "./componentes/ReviewForm/ReviewForm";
import HistorialUsuario from "./componentes/HistorialUsuario/HistorialUsuario";
import { Route } from "react-router-dom";
import About from "./componentes/About/About";
import modifCateg from "./componentes/modifCateg/modifCateg";
import { ProtectedRoute } from "./componentes/ProtectedRoute";
import UpdateProd from './componentes/UpdateProd/updateProd';
import FormCompra from "./componentes/formCompra/FormCompra";
import Review from "./componentes/Reviews/Reviews";

import SuperAdmin from "./componentes/superAdmin/superAdmin.jsx";

function App() {

  return (
    <div className="divPadre">
      <Route exact path="/" component={Home} />
      <Route path="/updateProd/:id" component={UpdateProd} />
      <Route path="/details/:id" component={Details} />
      <Route path="/compras/review/:id" component={Review} />
      <Route path="/cart" component={Carrito} />
      <Route path="/formCompra" component={FormCompra} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={Perfil} />
      <Route exact path="/favoritos/:email" component={Favorites} />
      <ProtectedRoute path="/answers" component={Answers} />
      <ProtectedRoute path="/modifCateg" component={modifCateg} />
      <ProtectedRoute path="/product" component={ProductCreate} />
      <ProtectedRoute path="/sales" component={VentasAdmin} />
      <ProtectedRoute path="/historial" component={HistorialUsuario} />
      <ProtectedRoute path="/review-form" component={ReviewForm} />
      <ProtectedRoute path="/superAdmin" component={SuperAdmin} />
    </div>
  );
}

export default App;
