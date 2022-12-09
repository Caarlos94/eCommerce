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

    // >>>>>>> development
  );
}

export default App;
