import "./App.css";
import ProductCreate from "./componentes/ProductCreate/ProductCreate";
import Home from "./componentes/home/home.jsx";
import Details from "./componentes/details/details";
import Perfil from "./componentes/navbar/Perfil/Perfil";
import Carrito from "./componentes/Carrito/Carrito";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./componentes/ProtectedRoute";

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <ProtectedRoute path="/product" component={ProductCreate} />

      <Route path="/details/:id" component={Details} />
      <Route path="/cart" component={Carrito} />
      <ProtectedRoute path="/profile" component={Perfil} />
    </div>
  );
}

export default App;
