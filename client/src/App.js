import './App.css';
// // <<<<<<< HEAD
// import { Route } from 'react-router-dom';
// import Home from './componentes/home/home.jsx';
// import SearchXname from './componentes/searchXname/SearchXname.jsx';
// import Details from './componentes/details/details.jsx';
// // import {BrowserRouter} from 'react-router-dom';

// function App() {
//   return (
//     <div>
//       <Route exact path="/">
//         <Home />
//       </Route>
//       <Route exact path="/details">
//         <Details />
//       </Route>
//       <Route path="/filtrados/:id" component={SearchXname} />
//     </div>
// =======
import Navbar from './componentes/navbar/navbar.jsx';
//import SearchXname from './componentes/searchXname/SearchXname.jsx';
import Home from './componentes/home/home.jsx';
import Details from './componentes/details/details.jsx';
import SearchXname from './componentes/searchXname/SearchXname.jsx';
import ProductCreate from './componentes/ProductCreate/ProductCreate'

import { Route } from 'react-router-dom';

function App() {
  return (
    <div>

      <Route path='/' component={Navbar} />
      <Route path='/filtrados/:id' component={SearchXname} />
      <Route path='/product' component={ProductCreate} />
      <Home />
      <Route exact path="/" component={Home} />
      <Route exact path="/details">
        <Details />
      </Route>

      
    </div>

    // >>>>>>> development
  );
}

export default App;
