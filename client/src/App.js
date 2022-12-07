import './App.css';
import Navbar from './componentes/navbar/navbar.jsx';
import SearchXname from './componentes/searchXname/SearchXname.jsx';
import Home from './componentes/home/home.jsx'


import { Route } from 'react-router-dom';

function App() {
  return (
   <div>

    

      <Route path='/' component={Navbar} />

      <Route path='/filtrados/:id' component={SearchXname} />


      <Home/>
   
  
    </div>   
 
  );
}

export default App;
