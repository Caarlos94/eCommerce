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

function App() {
  return (
    <div className="divPadre">
      <Route exact path="/" component={Home} />
      <Route path="/product" component={ProductCreate} />
      <Route path="/details/:id" component={Details} />
      <Route path="/cart" component={Carrito} />
      <ProtectedRoute path="/answers" component={Answers} />
      <Route path="/about" component={About} />
      <ProtectedRoute path="/modifCateg" component={modifCateg} />
      <Route path="/profile" component={Perfil} />
      <Route exact path="/favorites" component={Favorites} />
      <ProtectedRoute path="/sales" component={VentasAdmin} />
      <ProtectedRoute path="/historial" component={HistorialUsuario} />
      <ProtectedRoute path="/review-form" component={ReviewForm} />
    </div>
  );
}

export default App;
