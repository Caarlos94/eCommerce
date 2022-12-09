import './App.css';
import SearchXname from './componentes/searchXname/SearchXname.jsx';
import ProductCreate from './componentes/ProductCreate/ProductCreate'
import Home from './componentes/home/home.jsx'
import Details from './componentes/details/details'
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/filtrados/:id' component={SearchXname} />
      <Route path='/product' component={ProductCreate} />
      <Route path='/details' component={Details}/>
    </div>
  );
}

export default App;
