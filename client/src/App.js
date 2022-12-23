import './App.css';
import ProductCreate from './componentes/ProductCreate/ProductCreate';
import Home from './componentes/home/home.jsx';
import Details from './componentes/details/details';
import Perfil from './componentes/navbar/Perfil/Perfil';
import Carrito from './componentes/Carrito/Carrito';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className='divPadre'>
      <Route exact path="/" component={Home} />
      <Route path="/product" component={ProductCreate} />
      <Route path="/details/:id" component={Details} />
      <Route path="/profile" component={Perfil} />
      <Route exact path="/cart" component={Carrito} />
    </div>
  );
}

export default App;
