import './App.css';
import ProductCreate from './componentes/ProductCreate/ProductCreate';
import Home from './componentes/home/home.jsx';
import Details from './componentes/details/details';
import Perfil from './componentes/navbar/Perfil/Perfil';
import Carrito from './componentes/Carrito/Carrito';
import Answers from './componentes/Answers/Answers';
/* import QASection from './componentes/customersQA/QASection'; */
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/product" component={ProductCreate} />
      <Route path="/details/:id" component={Details} />
      <Route path="/profile" component={Perfil} />
      <Route path="/cart" component={Carrito} />
      <Route path="/answers" component={Answers} />
      {/* <Route path="/QASection" component={QASection} /> */}
    </div>
  );
}

export default App;
