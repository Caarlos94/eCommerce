import './App.css';
import { Route } from 'react-router-dom';
import Home from './componentes/home/home.jsx';
import Details from './componentes/details/details.jsx';
// import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/details">
        <Details />
      </Route>
    </div>
  );
}

export default App;
