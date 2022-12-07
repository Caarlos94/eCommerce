import './App.css';
// <<<<<<< HEAD
import { Route } from 'react-router-dom';
import Home from './componentes/home/home.jsx';
import Navbar from './componentes/navbar/navbar';
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
    // =======
    // import Navbar from './componentes/navbar/navbar.jsx';
    // import SearchXname from './componentes/searchXname/SearchXname.jsx';
    // import Home from './componentes/home/home.jsx'

    // import { Route } from 'react-router-dom';

    // function App() {
    //   return (
    //    <div>

    //       <Route path='/' component={Navbar} />

    //       <Route path='/filtrados/:id' component={SearchXname} />

    //       <Home/>

    //     </div>

    // >>>>>>> development
  );
}

export default App;
