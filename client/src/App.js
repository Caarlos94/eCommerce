import './App.css';
import Navbar from './componentes/navbar/navbar.jsx';
import SearchXname from './componentes/searchXname/SearchXname.jsx';
import ProductCreate from './componentes/ProductCreate/ProductCreate'
import Home from './componentes/home/home.jsx'

import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route path='/' component={Navbar} />
      <Route path='/filtrados/:id' component={SearchXname} />
      <Route path='/product' component={ProductCreate} />
      <Home />
    </div>
  );
}

export default App;
