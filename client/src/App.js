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

function App() {
  return (
    <div className="divPadre">
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/product" component={ProductCreate} />
      <ProtectedRoute path="/updateProd" component={UpdateProd} />
      <Route path="/details/:id" component={Details} />
      <Route path="/cart" component={Carrito} />
      <ProtectedRoute path="/answers" component={Answers} />
      <Route path="/about" component={About} />
      <ProtectedRoute path="/modifCateg" component={modifCateg} />
      <Route path="/profile" component={Perfil} />
      <Route exact path="/favorites" component={Favorites} />
      <ProtectedRoute path="/sales" component={VentasAdmin} />
    </div>
  );
}

export default App;
