import './App.css';
import ProductCreate from './componentes/ProductCreate/ProductCreate';
import Home from './componentes/home/home.jsx';
import Details from './componentes/details/details';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/product" component={ProductCreate} />
      <Route path="/details/:id" component={Details} />
      {/* <Route path="/prueba" component={Carrusell} /> */}
    </div>
  );
}

export default App;
