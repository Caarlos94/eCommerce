import './App.css';
import SearchXname from './componentes/searchXname/SearchXname.jsx';
import Home from './componentes/home/home.jsx';
import Details from './componentes/details/details.jsx';

import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/details">
        <Details />
      </Route>

      <Route path="/filtrados/:id" component={SearchXname} />
    </div>
  );
}

export default App;
